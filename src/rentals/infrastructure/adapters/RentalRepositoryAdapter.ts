import { axiosInstance } from "../../../shared/infrastructure/api/apiConfig";
import IRentalRepositoryPort from "../../application/ports/IRentalRepositoryPort";
import RentalEntity from "../../domain/entities/RentalEntity";

class RentalRepositoryAdapter implements IRentalRepositoryPort {
  async create(rental: RentalEntity): Promise<RentalEntity> {
    try {
      return axiosInstance.post('/rentals', {
        lesse_id: rental.lesse_id,
        lessor_id: rental.lessor_id,
        vehicle_id: rental.vehicle_id,
        start_date: rental.start_date,
        end_date: rental.end_date,
        total_amount: rental.total_amount,
        status: rental.status,
      }).then((response) => {
        const rental = response.data.data;

        return new RentalEntity({
          uuid: rental.uuid,
          lesse_id: rental.lesse_id,
          lessor_id: rental.lessor_id,
          vehicle_id: rental.vehicle_id,
          start_date: rental.start_date,
          end_date: rental.end_date,
          total_amount: rental.total_amount,
          status: rental.status,
        });
      });
    } catch (error) {
      console.error("Error al crear el alquiler:", error);
      return null;
    }
  }

  async getById(uuid: string): Promise<RentalEntity> {
    try {
      const response = await axiosInstance.get(`/rentals/${uuid}`);

      const rental = response.data.data;

      return new RentalEntity({
        uuid: rental.uuid,
        lesse_id: rental.lesse_id,
        lessor_id: rental.lessor_id,
        vehicle_id: rental.vehicle_id,
        start_date: rental.start_date,
        end_date: rental.end_date,
        total_amount: rental.total_amount,
        status: rental.status,
      });
    } catch (error) {
      console.error("Error al obtener el alquiler por uuid:", error);
      return null;
    }
  }
  
  async list(): Promise<RentalEntity[]> {
    try {
      const response = await axiosInstance.get('/rentals');

      const rentals = response.data;

      return rentals.map((rental: any) => {
        return new RentalEntity({
          uuid: rental.uuid,
          lesse_id: rental.lesse_id,
          lessor_id: rental.lessor_id,
          vehicle_id: rental.vehicle_id,
          start_date: rental.start_date,
          end_date: rental.end_date,
          total_amount: rental.total_amount,
          status: rental.status,
        });
      });
    } catch (error) {
      console.error("Error al listar los alquileres:", error);
      return [];
    }
  }

  async listByLessorId(lessor_id: string): Promise<RentalEntity[]> {
    try {
      const response = await axiosInstance.get(`/rentals/lessor/${lessor_id}`);

      const rentals = response.data.data;

      return rentals.map((rental: any) => {
        return new RentalEntity({
          uuid: rental.uuid,
          lesse_id: rental.lesse_id,
          lessor_id: rental.lessor_id,
          vehicle_id: rental.vehicle_id,
          start_date: rental.start_date,
          end_date: rental.end_date,
          total_amount: rental.total_amount,
          status: rental.status,
        });
      }).sort((a: RentalEntity, b: RentalEntity) => {
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      });
    } catch (error) {
      return [];
    }
  }

  async listByLesseId(lesse_id: string, active?: boolean): Promise<RentalEntity[]> {
    try {
      const response = await axiosInstance.get(`/rentals/lesse/${lesse_id}`, {
        params: {
          active: active ? true : undefined,
        }
      });

      const rentals = response.data.data;

      return rentals.map((rental: any) => {
        return new RentalEntity({
          uuid: rental.uuid,
          lesse_id: rental.lesse_id,
          lessor_id: rental.lessor_id,
          vehicle_id: rental.vehicle_id,
          start_date: rental.start_date,
          end_date: rental.end_date,
          total_amount: rental.total_amount,
          status: rental.status,
        });
      }).sort((a: RentalEntity, b: RentalEntity) => {
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      });
    } catch (error) {
      return [];
    }
  }

  async update(rental: RentalEntity, rentalId: string): Promise<RentalEntity> {
    try {
      return axiosInstance.put(`/rentals/${rentalId}`, {
        lesse_id: rental.lesse_id,
        lessor_id: rental.lessor_id,
        vehicle_id: rental.vehicle_id,
        start_date: rental.start_date,
        end_date: rental.end_date,
        total_amount: rental.total_amount,
        status: rental.status,
      }).then((response) => {
        const rental = response.data.data;

        return new RentalEntity({
          uuid: rental.uuid,
          lesse_id: rental.lesse_id,
          lessor_id: rental.lessor_id,
          vehicle_id: rental.vehicle_id,
          start_date: rental.start_date,
          end_date: rental.end_date,
          total_amount: rental.total_amount,
          status: rental.status,
        });
      });
    } catch (error) {
      console.error("Error al actualizar el alquiler:", error);
      return null;
    }
  }

  async isRentalActiveByVehicleId(vehicle_id: string): Promise<boolean> {
    try {
      console.log(vehicle_id);
      const response = await axiosInstance.get(`/rentals/is-active/vehicle/${vehicle_id}`);

      return response.data.data;
    } catch (error) {
      console.error("Error al verificar si el alquiler está activo por vehicle_id:", error);
      return null;
    }
  }
}

export default RentalRepositoryAdapter;