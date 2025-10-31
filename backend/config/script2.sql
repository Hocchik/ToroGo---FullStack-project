create table registered_drivers (
    id int primary key not null,
    full_name text not null,
    license text not null,
    is_license_expired boolean
);

create table registered_vehicles (
    plate text primary key not null,
    brand text not null,
    license text unique not null,
    driver_id int references registered_drivers(id)
);