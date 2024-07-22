class RentalEntity {
  uuid: string;
  lesse_id: string;
  lessor_id: string;
  vehicle_id: {
    
  }
  start_date: Date;
  end_date: Date;
  total_amount: number;
  status: string;

  constructor({uuid, lesse_id, lessor_id, vehicle_id, start_date, end_date, total_amount, status}) {
    this.uuid = uuid;
    this.lesse_id = lesse_id;
    this.lessor_id = lessor_id;
    this.vehicle_id = vehicle_id;
    this.start_date = start_date;
    this.end_date = end_date;
    this.total_amount = total_amount;
    this.status = status;
  }
}

export default RentalEntity;