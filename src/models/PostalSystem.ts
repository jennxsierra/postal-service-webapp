import { IPostalSystem } from "../interfaces/IPostalSystem";
import { IPackage } from "../interfaces/IPackage";
import { PackageStatus } from "../models/enums";
import { OneDayPackage } from "./OneDayPackage";
import { TwoDayPackage } from "./TwoDayPackage";
import pool from "../config/dbConfig";

export class PostalSystem implements IPostalSystem {
  public async addOneDayPackage(
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): Promise<IPackage> {
    const query = `
      INSERT INTO packages (tracking_number, sender_name, sender_address, receiver_name, receiver_address, weight, cost_per_unit_weight, flat_fee, shipping_method, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'OneDay', 'Created')
      RETURNING *;
    `;
    const values = [
      trackingNumber,
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      weight,
      costPerUnitWeight,
      flatFee,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  public async addTwoDayPackage(
    trackingNumber: string,
    senderName: string,
    senderAddress: string,
    receiverName: string,
    receiverAddress: string,
    weight: number,
    costPerUnitWeight: number,
    flatFee: number
  ): Promise<IPackage> {
    const query = `
      INSERT INTO packages (tracking_number, sender_name, sender_address, receiver_name, receiver_address, weight, cost_per_unit_weight, flat_fee, shipping_method, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'TwoDay', 'Created')
      RETURNING *;
    `;
    const values = [
      trackingNumber,
      senderName,
      senderAddress,
      receiverName,
      receiverAddress,
      weight,
      costPerUnitWeight,
      flatFee,
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  public async findPackage(
    trackingNumber: string
  ): Promise<IPackage | undefined> {
    const query = `SELECT * FROM packages WHERE tracking_number = $1;`;
    const result = await pool.query(query, [trackingNumber]);

    if (result.rows.length === 0) {
      return undefined;
    }

    const row = result.rows[0];
    if (row.shipping_method === "OneDay") {
      return new OneDayPackage(
        row.tracking_number,
        row.sender_name,
        row.sender_address,
        row.receiver_name,
        row.receiver_address,
        row.weight,
        row.cost_per_unit_weight,
        row.flat_fee,
        row.status
      );
    } else if (row.shipping_method === "TwoDay") {
      return new TwoDayPackage(
        row.tracking_number,
        row.sender_name,
        row.sender_address,
        row.receiver_name,
        row.receiver_address,
        row.weight,
        row.cost_per_unit_weight,
        row.flat_fee,
        row.status
      );
    }

    throw new Error(`Unknown shipping method: ${row.shipping_method}`);
  }

  public async getAllPackages(): Promise<IPackage[]> {
    const query = `SELECT * FROM packages;`;
    const result = await pool.query(query);

    return result.rows.map((row) => {
      if (row.shipping_method === "OneDay") {
        return new OneDayPackage(
          row.tracking_number,
          row.sender_name,
          row.sender_address,
          row.receiver_name,
          row.receiver_address,
          row.weight,
          row.cost_per_unit_weight,
          row.flat_fee,
          row.status
        );
      } else if (row.shipping_method === "TwoDay") {
        return new TwoDayPackage(
          row.tracking_number,
          row.sender_name,
          row.sender_address,
          row.receiver_name,
          row.receiver_address,
          row.weight,
          row.cost_per_unit_weight,
          row.flat_fee,
          row.status
        );
      }
      throw new Error(`Unknown shipping method: ${row.shipping_method}`);
    });
  }

  public async removePackage(trackingNumber: string): Promise<boolean> {
    const query = `DELETE FROM packages WHERE tracking_number = $1;`;
    const result = await pool.query(query, [trackingNumber]);
    return (result.rowCount ?? 0) > 0;
  }

  public async updatePackageStatus(
    trackingNumber: string,
    newStatus: PackageStatus
  ): Promise<boolean> {
    const query = `
      UPDATE packages
      SET status = $1, updated_at = CURRENT_TIMESTAMP
      WHERE tracking_number = $2;
    `;
    const result = await pool.query(query, [newStatus, trackingNumber]);
    return (result.rowCount ?? 0) > 0;
  }
}
