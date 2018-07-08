import { Customer } from "../models/customer";
import { DatabaseProvider } from "../database";

export class CustomerService {
    
    public async getById(id:number):Promise<Customer> {
        const connection = await DatabaseProvider.getConnected();
        return await connection.getRepository(Customer).findOne(id);
    }

    public async create(customer: Customer): Promise<Customer> {
        const connection = await DatabaseProvider.getConnected();
        return await connection.getRepository(Customer).save(customer);
    }

    public async list():Promise<Customer[]>{
        const connection = await DatabaseProvider.getConnected();
        return await connection.getRepository(Customer).find();
    }

    public async update(customer: Customer): Promise<Customer> {
        const connection = await DatabaseProvider.getConnected();
        const repo = connection.getRepository(Customer);
        const entity = await repo.findOne(customer.id);
        entity.firstName = customer.firstName;
        entity.lastName = customer.lastName;
        return await repo.save(entity);
    }

    public async del(id:number):Promise<void>{
        const connection = await DatabaseProvider.getConnected();
        await connection.getRepository(Customer).delete(id);
    }

}

export const customerService = new CustomerService();