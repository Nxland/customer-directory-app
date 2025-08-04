create table if not exists Customer
(
    CustomerID  bigint auto_increment
        primary key,
    CompanyName varchar(255)                        not null,
    Description varchar(255)                        null,
    Email       varchar(255)                        not null,
    Active      tinyint(1)                          null,
    CreatedAt   timestamp default CURRENT_TIMESTAMP not null,
    UpdatedAt   timestamp default CURRENT_TIMESTAMP not null on update CURRENT_TIMESTAMP,
    DeletedAt   timestamp                           null,
    constraint Email
        unique (Email)
);

create index idx_customer_email
    on Customer (Email);

create index idx_customer_phone
    on Customer (Description);

create table if not exists CustomerAddress
(
    CustomerAddressID bigint auto_increment
        primary key,
    CustomerID        bigint       not null,
    StreetAddress     varchar(255) not null,
    City              varchar(100) not null,
    StateProvince     varchar(100) not null,
    PostalCode        varchar(20)  not null,
    Country           varchar(100) not null,
    constraint CustomerAddress_ibfk_1
        foreign key (CustomerID) references Customer (CustomerID)
);

create index idx_customer_address_customer
    on CustomerAddress (CustomerID);

create table if not exists Subscription
(
    SubscriptionID    bigint auto_increment
        primary key,
    CustomerID        bigint                         not null,
    Cost              decimal(9, 2)                  not null,
    PaymentMethod     enum ('creditcard', 'invoice') not null,
    CreditBalance    decimal(15, 2) default 0.00    not null,
    BillingPeriod     enum ('yearly', 'monthly')     not null,
    PreferredCurrency char(3)        default 'USD'   not null,
    constraint Subscription_ibfk_1
        foreign key (CustomerID) references Customer (CustomerID)
);

create index idx_financial_info_customer
    on Subscription (CustomerID);
