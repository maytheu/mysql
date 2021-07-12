CREATE TABLE `userMagMYSQL`.`user` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `first_name` VARCHAR(45) NOT NULL , `last_name` VARCHAR(45) NOT NULL , `email` VARCHAR(45) NOT NULL , `phone` VARCHAR(45) NOT NULL , `comments` TEXT NOT NULL , `status` VARCHAR(10) NOT NULL DEFAULT 'active' , PRIMARY KEY (`id`)) ENGINE = InnoDB;


INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `phone`, `comments`, `status`) VALUES (NULL, 'Laue', 'Meto', 'laue@yahoo.com', '0123456789', 'First insert to MYSQL', 'active');