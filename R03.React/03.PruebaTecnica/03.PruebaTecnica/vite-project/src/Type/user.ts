import { z } from "zod";

export const userSchema = z.object({
    gender: z.string(),
    name: z.object({ title: z.string(), first: z.string(), last: z.string() }),
    location: z.object({
        street: z.object({ number: z.number(), name: z.string() }),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        postcode: z.union([z.string(), z.number()]),
        coordinates: z.object({ latitude: z.string(), longitude: z.string() }),
        timezone: z.object({ offset: z.string(), description: z.string() }),
    }),
    email: z.string(),
    login: z.object({
        uuid: z.string(),
        username: z.string(),
        password: z.string(),
        salt: z.string(),
        md5: z.string(),
        sha1: z.string(),
        sha256: z.string(),
    }),
    dob: z.object({ date: z.string(), age: z.number() }),
    registered: z.object({ date: z.string(), age: z.number() }),
    phone: z.string(),
    cell: z.string(),
    id: z.object({ name: z.any(), value: z.any() }),
    picture: z.object({
        large: z.string(),
        medium: z.string(),
        thumbnail: z.string(),
    }),
    nat: z.string(),
});

export type User = z.infer<typeof userSchema>;

/*  */

export const schema = z.object({
    results: z.array(
        z.union([
            z.object({
                gender: z.string(),
                name: z.object({
                    title: z.string(),
                    first: z.string(),
                    last: z.string(),
                }),
                location: z.object({
                    street: z.object({ number: z.number(), name: z.string() }),
                    city: z.string(),
                    state: z.string(),
                    country: z.string(),
                    postcode: z.number(),
                    coordinates: z.object({
                        latitude: z.string(),
                        longitude: z.string(),
                    }),
                    timezone: z.object({
                        offset: z.string(),
                        description: z.string(),
                    }),
                }),
                email: z.string(),
                login: z.object({
                    uuid: z.string(),
                    username: z.string(),
                    password: z.string(),
                    salt: z.string(),
                    md5: z.string(),
                    sha1: z.string(),
                    sha256: z.string(),
                }),
                dob: z.object({ date: z.string(), age: z.number() }),
                registered: z.object({ date: z.string(), age: z.number() }),
                phone: z.string(),
                cell: z.string(),
                id: z.object({ name: z.string(), value: z.string() }),
                picture: z.object({
                    large: z.string(),
                    medium: z.string(),
                    thumbnail: z.string(),
                }),
                nat: z.string(),
            }),
            z.object({
                gender: z.string(),
                name: z.object({
                    title: z.string(),
                    first: z.string(),
                    last: z.string(),
                }),
                location: z.object({
                    street: z.object({ number: z.number(), name: z.string() }),
                    city: z.string(),
                    state: z.string(),
                    country: z.string(),
                    postcode: z.number(),
                    coordinates: z.object({
                        latitude: z.string(),
                        longitude: z.string(),
                    }),
                    timezone: z.object({
                        offset: z.string(),
                        description: z.string(),
                    }),
                }),
                email: z.string(),
                login: z.object({
                    uuid: z.string(),
                    username: z.string(),
                    password: z.string(),
                    salt: z.string(),
                    md5: z.string(),
                    sha1: z.string(),
                    sha256: z.string(),
                }),
                dob: z.object({ date: z.string(), age: z.number() }),
                registered: z.object({ date: z.string(), age: z.number() }),
                phone: z.string(),
                cell: z.string(),
                id: z.object({ name: z.string(), value: z.null() }),
                picture: z.object({
                    large: z.string(),
                    medium: z.string(),
                    thumbnail: z.string(),
                }),
                nat: z.string(),
            }),
            z.object({
                gender: z.string(),
                name: z.object({
                    title: z.string(),
                    first: z.string(),
                    last: z.string(),
                }),
                location: z.object({
                    street: z.object({ number: z.number(), name: z.string() }),
                    city: z.string(),
                    state: z.string(),
                    country: z.string(),
                    postcode: z.string(),
                    coordinates: z.object({
                        latitude: z.string(),
                        longitude: z.string(),
                    }),
                    timezone: z.object({
                        offset: z.string(),
                        description: z.string(),
                    }),
                }),
                email: z.string(),
                login: z.object({
                    uuid: z.string(),
                    username: z.string(),
                    password: z.string(),
                    salt: z.string(),
                    md5: z.string(),
                    sha1: z.string(),
                    sha256: z.string(),
                }),
                dob: z.object({ date: z.string(), age: z.number() }),
                registered: z.object({ date: z.string(), age: z.number() }),
                phone: z.string(),
                cell: z.string(),
                id: z.object({ name: z.string(), value: z.string() }),
                picture: z.object({
                    large: z.string(),
                    medium: z.string(),
                    thumbnail: z.string(),
                }),
                nat: z.string(),
            }),
        ])
    ),
    info: z.object({
        seed: z.string(),
        results: z.number(),
        page: z.number(),
        version: z.string(),
    }),
});

export type TypeApi = z.infer<typeof schema>;
