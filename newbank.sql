-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2021 at 11:29 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `newbank`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `agence`
--

CREATE TABLE `agence` (
  `id_agence` bigint(20) NOT NULL,
  `adresse_agence` varchar(255) DEFAULT NULL,
  `email_agence` varchar(255) DEFAULT NULL,
  `nom_agence` varchar(255) DEFAULT NULL,
  `telephone_agence` varchar(255) DEFAULT NULL,
  `creation_admin_agence` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `agence`
--

INSERT INTO `agence` (`id_agence`, `adresse_agence`, `email_agence`, `nom_agence`, `telephone_agence`, `creation_admin_agence`) VALUES
(1, '48 Mayfield St. West Haven, CT 06516', 'agence1@banki.com', 'Agence 1', '0511111111', 1);

-- --------------------------------------------------------

--
-- Table structure for table `agent`
--

CREATE TABLE `agent` (
  `id` bigint(20) NOT NULL,
  `agence_agent` bigint(20) DEFAULT NULL,
  `creation_admin_agent` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `agent`
--

INSERT INTO `agent` (`id`, `agence_agent`, `creation_admin_agent`) VALUES
(2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` bigint(20) NOT NULL,
  `agence_client` bigint(20) DEFAULT NULL,
  `creation_agent_client` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `agence_client`, `creation_agent_client`) VALUES
(3, 1, 2),
(4, 1, 2),
(5, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `client_beneficiares`
--

CREATE TABLE `client_beneficiares` (
  `client_id` bigint(20) NOT NULL,
  `beneficiares_id_compte` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `client_beneficiares`
--

INSERT INTO `client_beneficiares` (`client_id`, `beneficiares_id_compte`) VALUES
(3, 7),
(3, 8),
(4, 5),
(4, 8),
(5, 5),
(5, 7);

-- --------------------------------------------------------

--
-- Table structure for table `compte`
--

CREATE TABLE `compte` (
  `id_compte` bigint(20) NOT NULL,
  `creation_date_compte` datetime DEFAULT NULL,
  `numero_compte` varchar(255) DEFAULT NULL,
  `solde_compte` double DEFAULT NULL,
  `type_compte` varchar(255) DEFAULT NULL,
  `creation_agent_compte` bigint(20) DEFAULT NULL,
  `devise_compte` bigint(20) DEFAULT NULL,
  `proprietaire_compte` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `compte`
--

INSERT INTO `compte` (`id_compte`, `creation_date_compte`, `numero_compte`, `solde_compte`, `type_compte`, `creation_agent_compte`, `devise_compte`, `proprietaire_compte`) VALUES
(5, NULL, '29879316542181102365', 39143.850000000006, 'Compte d\'épargne', NULL, 1, 3),
(6, '2021-06-22 14:11:16', '19500386754438226871', 0, 'Compte operateur', 2, 1, NULL),
(7, NULL, '95348897935973918985', 0, 'Compte sur carnet', NULL, 2, 4),
(8, NULL, '87198907469096266690', 48762.84, 'Compte sur carnet', NULL, 3, 5);

-- --------------------------------------------------------

--
-- Table structure for table `devise`
--

CREATE TABLE `devise` (
  `id_devise` bigint(20) NOT NULL,
  `code_devise` varchar(255) DEFAULT NULL,
  `creation_date_devise` datetime DEFAULT NULL,
  `modification_date_devise` datetime DEFAULT NULL,
  `nom_devise` varchar(255) DEFAULT NULL,
  `creation_admin_devise` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `devise`
--

INSERT INTO `devise` (`id_devise`, `code_devise`, `creation_date_devise`, `modification_date_devise`, `nom_devise`, `creation_admin_devise`) VALUES
(1, 'MAD', '2021-06-22 13:48:30', '2021-06-22 13:48:30', 'Dirham Marocain', NULL),
(2, 'USD', '2021-06-22 14:13:04', '2021-06-22 14:13:04', 'Dollar Americain', NULL),
(3, 'EUR', '2021-06-22 14:47:07', '2021-06-22 14:47:07', 'Euro', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `operateur`
--

CREATE TABLE `operateur` (
  `id` bigint(20) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `compte_id_compte` bigint(20) DEFAULT NULL,
  `creation_agent_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operateur`
--

INSERT INTO `operateur` (`id`, `email`, `logo`, `nom`, `compte_id_compte`, `creation_agent_id`) VALUES
(2, 'iam@iam.ma', 'iam.ma/logo.png', 'IAM', 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `operation`
--

CREATE TABLE `operation` (
  `id_operation` bigint(20) NOT NULL,
  `date_operation` datetime DEFAULT NULL,
  `somme_compte_operation` double DEFAULT NULL,
  `somme_espece_operation` double DEFAULT NULL,
  `type_operation` varchar(255) DEFAULT NULL,
  `compte_operation` bigint(20) DEFAULT NULL,
  `devise_operation` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `operation`
--

INSERT INTO `operation` (`id_operation`, `date_operation`, `somme_compte_operation`, `somme_espece_operation`, `type_operation`, `compte_operation`, `devise_operation`) VALUES
(11, '2021-06-22 21:53:53', 10000, 10000, 'Versement', 5, 1),
(12, '2021-06-22 21:54:57', 3000, 3000, 'Retrait', 5, 1),
(13, '2021-06-22 22:08:04', 15000, 15000, 'Versement', 5, 1),
(14, '2021-06-22 22:08:52', 50000, 50000, 'Versement', 8, 3);

-- --------------------------------------------------------

--
-- Table structure for table `rdv`
--

CREATE TABLE `rdv` (
  `id` bigint(20) NOT NULL,
  `date_rdv` date NOT NULL,
  `heure_rdv` time NOT NULL,
  `service` varchar(255) DEFAULT NULL,
  `agence_id_agence` bigint(20) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rdv`
--

INSERT INTO `rdv` (`id`, `date_rdv`, `heure_rdv`, `service`, `agence_id_agence`, `client_id`) VALUES
(1, '1970-01-23', '12:47:24', 'Ouverture un compte personnel', 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `recharge`
--

CREATE TABLE `recharge` (
  `id_recharge` bigint(20) NOT NULL,
  `date_recharge` datetime DEFAULT NULL,
  `somme_env_recharge` double DEFAULT NULL,
  `somme_recu_recharge` double DEFAULT NULL,
  `telephone_recharge` varchar(255) DEFAULT NULL,
  `compte_recharge` bigint(20) DEFAULT NULL,
  `devise_recharge` bigint(20) DEFAULT NULL,
  `operateur_recharge` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `utilisateur`
--

CREATE TABLE `utilisateur` (
  `id` bigint(20) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `cin` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `locked` varchar(255) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `utilisateur`
--

INSERT INTO `utilisateur` (`id`, `adresse`, `cin`, `email`, `locked`, `nom`, `password`, `prenom`, `role`, `telephone`, `username`) VALUES
(1, '123 Rue Med V', 'P123456', 'ensa.backend@gmail.com', 'N', 'Admin', '$2a$10$/K/EaRMrf.HdZhqUsPsl1uRNMxnjFB6ZaAqYdg/8Woqref1jD75Jy', 'Principal', 'Admin', '0612345678', 'admin'),
(2, '123 Rue ABC', 'AB123', 'aymane.agence1@banki.com', 'N', 'Boumaaza', '$2a$10$whbLZCMLkwfxA5m1z/v6uulXGkRHHwv7yV5iw68yxIms8qtQsbJ/S', 'Aymane', 'Agent', '0611111111', 'aymane'),
(3, '125 Main Road', 'JD123', 'john.client.agence1@banki.com', 'N', 'John', '$2a$10$vD3Tl9VHdw9ouxj59VY8Xu7tngic6c/p9uze1xZ5n4weeCKdIKDDS', 'Doe', 'Client', '0622222222', 'john'),
(4, '152 Road ABC', 'JD321', 'jane@banki.com', 'N', 'Jane', '$2a$10$IX1bcJHs9DPQHaPkDp8K.OeDvjbTNNPcVioPSxxteRodrjwEN.g6y', 'Doe', 'Client', '0633333333', 'jane'),
(5, 'majid', 'mj123', 'majid@majid.com', 'N', 'majid', '$2a$10$Xgeo0d4BPO9MUr.ROUE/EuJcMLjNsfifQkcyRUrKJNKClPiDBZ.RK', 'majid', 'Client', '0655555555', 'majid');

-- --------------------------------------------------------

--
-- Table structure for table `virement`
--

CREATE TABLE `virement` (
  `id_virement` bigint(20) NOT NULL,
  `date_virement` datetime DEFAULT NULL,
  `somme_env_virement` double DEFAULT NULL,
  `somme_recu_virement` double DEFAULT NULL,
  `creancier_virement` bigint(20) DEFAULT NULL,
  `debiteur_virement` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `virement`
--

INSERT INTO `virement` (`id_virement`, `date_virement`, `somme_env_virement`, `somme_recu_virement`, `creancier_virement`, `debiteur_virement`) VALUES
(11, '2021-06-02 21:53:53', 0, 10000, 5, NULL),
(12, '2021-06-04 21:55:14', 3000, 0, NULL, 5),
(13, '2021-06-07 22:08:04', 0, 15000, 5, NULL),
(14, '2021-06-15 22:08:52', 0, 50000, 8, NULL),
(15, '2021-06-22 22:10:58', 5000, 53143.85, 5, 8),
(16, '2021-06-22 22:21:21', 40000, 3762.84, 8, 5);

-- --------------------------------------------------------

--
-- Table structure for table `virementmultiple`
--

CREATE TABLE `virementmultiple` (
  `id_virement_multiple` bigint(20) NOT NULL,
  `date_virement_multiple` datetime DEFAULT NULL,
  `nb_benificiares_virement_multiple` int(11) DEFAULT NULL,
  `debiteur_virement_multiple` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `virement_multi_ben`
--

CREATE TABLE `virement_multi_ben` (
  `id_virementmulti` bigint(20) NOT NULL,
  `montant` double DEFAULT NULL,
  `creancier_virement` bigint(20) DEFAULT NULL,
  `virement_multiple_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `agence`
--
ALTER TABLE `agence`
  ADD PRIMARY KEY (`id_agence`),
  ADD UNIQUE KEY `UK_fok72pesq7mv2wgfj6d8co6va` (`nom_agence`),
  ADD UNIQUE KEY `UK_qis7yadpxvk7ipwy5xx3kvbc4` (`telephone_agence`),
  ADD KEY `FK9p9s7tyhinawh66m6xxxkusbv` (`creation_admin_agence`);

--
-- Indexes for table `agent`
--
ALTER TABLE `agent`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK9vb5uoc9ydv9l5uibls95gofq` (`agence_agent`),
  ADD KEY `FK7nfid8tnmlovcmxyixivowgok` (`creation_admin_agent`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKffhxhi0svo09jynreeh558im9` (`agence_client`),
  ADD KEY `FK3olu6yn8ow9w7nv3pp5yub4n6` (`creation_agent_client`);

--
-- Indexes for table `client_beneficiares`
--
ALTER TABLE `client_beneficiares`
  ADD PRIMARY KEY (`client_id`,`beneficiares_id_compte`),
  ADD KEY `FKi87jtwanioc8qadgnn9h1qmmk` (`beneficiares_id_compte`);

--
-- Indexes for table `compte`
--
ALTER TABLE `compte`
  ADD PRIMARY KEY (`id_compte`),
  ADD UNIQUE KEY `UK_hx2we7gc1i1c5ylusignv31f3` (`numero_compte`),
  ADD KEY `FKyg8viwuq54yanf42nl7erwgw` (`creation_agent_compte`),
  ADD KEY `FKn7sywd29k1cg2r3cguettcewr` (`devise_compte`),
  ADD KEY `FKv0peuejqne4hime4hjbdsaon` (`proprietaire_compte`);

--
-- Indexes for table `devise`
--
ALTER TABLE `devise`
  ADD PRIMARY KEY (`id_devise`),
  ADD UNIQUE KEY `UK_fmkthia8gxtcjwppyqv8om5ap` (`code_devise`),
  ADD KEY `FKqm6v94y1f0vy3nqqp01namdwq` (`creation_admin_devise`);

--
-- Indexes for table `operateur`
--
ALTER TABLE `operateur`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKlm5ydyyts9vbcnxbmkrp3jlpg` (`compte_id_compte`),
  ADD KEY `FKlw29n560w87jbcr7hi9fc3dlw` (`creation_agent_id`);

--
-- Indexes for table `operation`
--
ALTER TABLE `operation`
  ADD PRIMARY KEY (`id_operation`),
  ADD KEY `FK18c9p187hjinfy9dc0ti8hhr0` (`compte_operation`),
  ADD KEY `FKbrqelc1lkeqjs20leu5frs2y0` (`devise_operation`);

--
-- Indexes for table `rdv`
--
ALTER TABLE `rdv`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6f4kk615ufxddudrkilh7t3py` (`agence_id_agence`),
  ADD KEY `FK4geby8ybg0xdiyyopc7gyh2jc` (`client_id`);

--
-- Indexes for table `recharge`
--
ALTER TABLE `recharge`
  ADD PRIMARY KEY (`id_recharge`),
  ADD KEY `FK71cbqb9fv8oxe98gyfga9p2sh` (`compte_recharge`),
  ADD KEY `FKdb53npqaycnmq6refe62hlruy` (`devise_recharge`),
  ADD KEY `FK2pughhi0ss3qfim1ehaay85w1` (`operateur_recharge`);

--
-- Indexes for table `utilisateur`
--
ALTER TABLE `utilisateur`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_kq7nt5wyq9v9lpcpgxag2f24a` (`username`);

--
-- Indexes for table `virement`
--
ALTER TABLE `virement`
  ADD PRIMARY KEY (`id_virement`),
  ADD KEY `FKii81m9a51q2tqate5icp9as3w` (`creancier_virement`),
  ADD KEY `FKov0teenvrnbw16orck7wsw47w` (`debiteur_virement`);

--
-- Indexes for table `virementmultiple`
--
ALTER TABLE `virementmultiple`
  ADD PRIMARY KEY (`id_virement_multiple`),
  ADD KEY `FK8wgllhvs7v1f6ayyf3u3bssc0` (`debiteur_virement_multiple`);

--
-- Indexes for table `virement_multi_ben`
--
ALTER TABLE `virement_multi_ben`
  ADD PRIMARY KEY (`id_virementmulti`),
  ADD KEY `FKqs5b7i138aquap1j4o105fpar` (`creancier_virement`),
  ADD KEY `FKf58i5vow079y15xybwhu3lgsw` (`virement_multiple_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `agence`
--
ALTER TABLE `agence`
  MODIFY `id_agence` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `compte`
--
ALTER TABLE `compte`
  MODIFY `id_compte` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `devise`
--
ALTER TABLE `devise`
  MODIFY `id_devise` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `operateur`
--
ALTER TABLE `operateur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `operation`
--
ALTER TABLE `operation`
  MODIFY `id_operation` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `rdv`
--
ALTER TABLE `rdv`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `recharge`
--
ALTER TABLE `recharge`
  MODIFY `id_recharge` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `utilisateur`
--
ALTER TABLE `utilisateur`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `virement`
--
ALTER TABLE `virement`
  MODIFY `id_virement` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `virementmultiple`
--
ALTER TABLE `virementmultiple`
  MODIFY `id_virement_multiple` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `virement_multi_ben`
--
ALTER TABLE `virement_multi_ben`
  MODIFY `id_virementmulti` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `FKgodqjbbtwk30kf3s0xuxklkr3` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `agence`
--
ALTER TABLE `agence`
  ADD CONSTRAINT `FK9p9s7tyhinawh66m6xxxkusbv` FOREIGN KEY (`creation_admin_agence`) REFERENCES `admin` (`id`);

--
-- Constraints for table `agent`
--
ALTER TABLE `agent`
  ADD CONSTRAINT `FK7nfid8tnmlovcmxyixivowgok` FOREIGN KEY (`creation_admin_agent`) REFERENCES `admin` (`id`),
  ADD CONSTRAINT `FK9vb5uoc9ydv9l5uibls95gofq` FOREIGN KEY (`agence_agent`) REFERENCES `agence` (`id_agence`),
  ADD CONSTRAINT `FKoqghuuphfog6kj5cwvmy9movn` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `FK3olu6yn8ow9w7nv3pp5yub4n6` FOREIGN KEY (`creation_agent_client`) REFERENCES `agent` (`id`),
  ADD CONSTRAINT `FKffhxhi0svo09jynreeh558im9` FOREIGN KEY (`agence_client`) REFERENCES `agence` (`id_agence`),
  ADD CONSTRAINT `FKod74ye6k4t6qnirp5a5a8bkm9` FOREIGN KEY (`id`) REFERENCES `utilisateur` (`id`);

--
-- Constraints for table `client_beneficiares`
--
ALTER TABLE `client_beneficiares`
  ADD CONSTRAINT `FKi87jtwanioc8qadgnn9h1qmmk` FOREIGN KEY (`beneficiares_id_compte`) REFERENCES `compte` (`id_compte`),
  ADD CONSTRAINT `FKihvoea3tjf7iy7pbn9rrc5ah2` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`);

--
-- Constraints for table `compte`
--
ALTER TABLE `compte`
  ADD CONSTRAINT `FKn7sywd29k1cg2r3cguettcewr` FOREIGN KEY (`devise_compte`) REFERENCES `devise` (`id_devise`),
  ADD CONSTRAINT `FKv0peuejqne4hime4hjbdsaon` FOREIGN KEY (`proprietaire_compte`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `FKyg8viwuq54yanf42nl7erwgw` FOREIGN KEY (`creation_agent_compte`) REFERENCES `agent` (`id`);

--
-- Constraints for table `devise`
--
ALTER TABLE `devise`
  ADD CONSTRAINT `FKqm6v94y1f0vy3nqqp01namdwq` FOREIGN KEY (`creation_admin_devise`) REFERENCES `admin` (`id`);

--
-- Constraints for table `operateur`
--
ALTER TABLE `operateur`
  ADD CONSTRAINT `FKlm5ydyyts9vbcnxbmkrp3jlpg` FOREIGN KEY (`compte_id_compte`) REFERENCES `compte` (`id_compte`),
  ADD CONSTRAINT `FKlw29n560w87jbcr7hi9fc3dlw` FOREIGN KEY (`creation_agent_id`) REFERENCES `agent` (`id`);

--
-- Constraints for table `operation`
--
ALTER TABLE `operation`
  ADD CONSTRAINT `FK18c9p187hjinfy9dc0ti8hhr0` FOREIGN KEY (`compte_operation`) REFERENCES `compte` (`id_compte`),
  ADD CONSTRAINT `FKbrqelc1lkeqjs20leu5frs2y0` FOREIGN KEY (`devise_operation`) REFERENCES `devise` (`id_devise`);

--
-- Constraints for table `rdv`
--
ALTER TABLE `rdv`
  ADD CONSTRAINT `FK4geby8ybg0xdiyyopc7gyh2jc` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`),
  ADD CONSTRAINT `FK6f4kk615ufxddudrkilh7t3py` FOREIGN KEY (`agence_id_agence`) REFERENCES `agence` (`id_agence`);

--
-- Constraints for table `recharge`
--
ALTER TABLE `recharge`
  ADD CONSTRAINT `FK2pughhi0ss3qfim1ehaay85w1` FOREIGN KEY (`operateur_recharge`) REFERENCES `operateur` (`id`),
  ADD CONSTRAINT `FK71cbqb9fv8oxe98gyfga9p2sh` FOREIGN KEY (`compte_recharge`) REFERENCES `compte` (`id_compte`),
  ADD CONSTRAINT `FKdb53npqaycnmq6refe62hlruy` FOREIGN KEY (`devise_recharge`) REFERENCES `devise` (`id_devise`);

--
-- Constraints for table `virement`
--
ALTER TABLE `virement`
  ADD CONSTRAINT `FKii81m9a51q2tqate5icp9as3w` FOREIGN KEY (`creancier_virement`) REFERENCES `compte` (`id_compte`),
  ADD CONSTRAINT `FKov0teenvrnbw16orck7wsw47w` FOREIGN KEY (`debiteur_virement`) REFERENCES `compte` (`id_compte`);

--
-- Constraints for table `virementmultiple`
--
ALTER TABLE `virementmultiple`
  ADD CONSTRAINT `FK8wgllhvs7v1f6ayyf3u3bssc0` FOREIGN KEY (`debiteur_virement_multiple`) REFERENCES `compte` (`id_compte`);

--
-- Constraints for table `virement_multi_ben`
--
ALTER TABLE `virement_multi_ben`
  ADD CONSTRAINT `FKf58i5vow079y15xybwhu3lgsw` FOREIGN KEY (`virement_multiple_id`) REFERENCES `virementmultiple` (`id_virement_multiple`),
  ADD CONSTRAINT `FKqs5b7i138aquap1j4o105fpar` FOREIGN KEY (`creancier_virement`) REFERENCES `compte` (`id_compte`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
