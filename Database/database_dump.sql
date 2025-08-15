-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: shopzeedatabase
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cartItemId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`cartItemId`),
  KEY `fk_user` (`userId`),
  KEY `fk_product` (`productId`),
  CONSTRAINT `fk_product` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`),
  CONSTRAINT `fk_user` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (42,1001,103,1),(43,1001,104,1),(44,1007,106,1),(45,1007,107,1),(46,1007,102,3);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `productId` int NOT NULL,
  `productName` varchar(255) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (101,'Wireless Mouse','Logitech','Electronics',799.00),(102,'Gaming Keyboard','Razer','Electronics',3499.00),(103,'Running Shoes','Nike','Footwear',4999.00),(104,'Cotton T-Shirt','H&M','Clothing',999.00),(105,'Smartphone','Samsung','Mobiles',19999.00),(106,'Bluetooth Headphones','Sony','Electronics',5999.00),(107,'Analog Watch','Fossil','Accessories',8999.00),(108,'Backpack','Wildcraft','Bags',2499.00),(109,'Water Bottle','Milton','Kitchen',499.00),(110,'LED Monitor','Dell','Electronics',12999.00),(111,'Wireless Bluetooth Earbuds','Boat','Electronics',2499.00),(112,'Men\'s Slim Fit Jeans','Levi\'s','Clothing',2999.00),(113,'Women\'s Summer Dress','H&M','Clothing',1999.00),(114,'Digital Wrist Watch','Casio','Accessories',1499.00),(115,'Leather Wallet','Wildhorn','Accessories',799.00),(116,'Men\'s Running Shoes','Nike','Footwear',3999.00),(117,'Women\'s Sneakers','Adidas','Footwear',3599.00),(118,'Non-Stick Frying Pan','Prestige','Kitchen',899.00),(119,'Microwave Oven','Samsung','Kitchen',8499.00),(120,'Leather Backpack','Skybags','Bags',2499.00),(121,'Trolley Suitcase','American Tourister','Bags',5599.00),(122,'Smartphone Galaxy M14','Samsung','Mobiles',13499.00),(123,'Smartphone Redmi Note 12','Xiaomi','Mobiles',12999.00),(124,'Smart LED TV 32 Inch','LG','Electronics',15499.00),(125,'Keyboard & Mouse Combo','Logitech','Electronics',2499.00),(126,'Men\'s Formal Shirt','Van Heusen','Clothing',1799.00),(127,'Women\'s Cotton Kurti','Biba','Clothing',1299.00),(128,'Sunglasses','Ray-Ban','Accessories',4999.00),(129,'Analog Wall Clock','Ajanta','Accessories',699.00),(130,'Sports Sandals','Puma','Footwear',2299.00),(131,'Formal Leather Shoes','Bata','Footwear',2799.00),(132,'Electric Kettle','Philips','Kitchen',1499.00),(133,'Hand Blender','Bajaj','Kitchen',1199.00),(134,'Laptop Backpack','Lenovo','Bags',1999.00),(135,'Duffel Gym Bag','Nike','Bags',1499.00),(136,'OnePlus Nord CE 3','OnePlus','Mobiles',24999.00),(137,'iPhone 14','Apple','Mobiles',69999.00),(138,'Bluetooth Speaker','JBL','Electronics',3499.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` int NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phonenumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1001,'Steven123','steve@123','steven@yahoo.com','9877756555'),(1002,'Rosy729','rose@235','rose111@yahoo.com','8955543256'),(1003,'Daniel777','dave@123','daniel@yahoo.com','7776564332'),(1004,'Sofie111','sofie@345','sofie@hotmail.com','9998765678'),(1005,'Max3000','max@3000','max@yahoo.co.in','6399932775'),(1006,'Andy777','and@555','andy@gmail.com','7776567676'),(1007,'Dev555','Dave@234','dev@gmail.com','9465247838');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlistItemId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`wishlistItemId`),
  UNIQUE KEY `userId` (`userId`,`productId`),
  KEY `productId` (`productId`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (3,1001,101),(4,1007,102);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-15 14:36:21
