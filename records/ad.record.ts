import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';
import {validationUrl} from "../utils/validation-url";

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;
    constructor(obj: NewAdEntity) {
        if(!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków.');
        }

        if(obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.');
        }

        if(obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza od 0, lub większa niż 9 999 999.');
        }

        if(!obj.url || obj.url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków');
        }

        if (!validationUrl(obj.url)) {
            throw new ValidationError(
                'Check that it contains For example, a protocol, https, a //, and so on.');
        }

        if(typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia!');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = (await pool.execute('SELECT * FROM `ads` WHERE id= :id', {
            id,
        })) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }

        await pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `lat`, `lon`) VALUES(:id, :name, :description, :price, :url, :lat, :lon)",{
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            url: this.url,
            lat: this.lat,
            lon: this.lon,
        });
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return results.map(result => {
            const {
                id, lat, lon,
            } = result;

            return {
                id, lat, lon,
            };
        });
    }
}