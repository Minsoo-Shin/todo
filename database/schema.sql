CREATE DATABASE `todo`;
USE `todo`;
CREATE TABLE `todo`.`user` (
    `api_key` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(20) NOT NULL,
    `age` INT NOT NULL,
    PRIMARY KEY (`id`)) ENGINE = InnoDB;

CREATE TABLE todo.todos (
    `name` VARCHAR(100) NOT NULL,
    `completed` BOOLEAN,
	`id` INT NOT NULL AUTO_INCREMENT,
    completed_at timestamp default current_timestamp on update current_timestamp,
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp on update current_timestamp,
    fk_api_key INT,
    FOREIGN KEY (fk_api_key)
    REFERENCES user(api_id),
    PRIMARY KEY (id)) ENGINE = InnoDB;