import express from 'express';
import { Users } from '../entities/Users';
import { Tigo, Vodacom, Airtel, Halotel } from '../entities/CompanyEntity';
import { Transaction, TransactionStatus, TransactionType } from '../entities/utils/Transaction';
import { getConnection, getRepository, getManager, createQueryBuilder, EntityManager  } from 'typeorm';


const auth = require('../middleware/auth')

const router = express.Router();

// @route GET  api/transactions/delete
// @desc Delete transaction
// @access Private
router.delete('/api/transaction/delete/id/:id/comp_type/:comp_type', auth, async (req: any, res: any) => {
  try {

    const { id, comp_type } = req.params

    // const userRepo = getRepository(User); 
    // const user = await userRepo.findOne({ id: parseInt( req.user.id ) });

    if (comp_type === 'TIGO') {
      
      await getConnection()
      .createQueryBuilder()
      .update(Tigo)
      .set({ status: TransactionStatus.DELETED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(comp_type === 'VODACOM') {

      await getConnection()
      .createQueryBuilder()
      .update(Vodacom)
      .set({ status: TransactionStatus.DELETED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(comp_type === 'AIRTEL') {

      await getConnection()
      .createQueryBuilder()
      .update(Airtel)
      .set({ status: TransactionStatus.DELETED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(comp_type === 'HALOTEL') {

      await getConnection()
      .createQueryBuilder()
      .update(Halotel)
      .set({ status: TransactionStatus.DELETED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()
    }

    let userId = parseInt(req.user.id)

    let userTransactions = null

    if (comp_type === 'TIGO') {
      userTransactions = await getRepository(Tigo) 
      .createQueryBuilder("tigo")
      .select("tigo.id", "id")
      .addSelect("tigo.transaction_type", "transactiontype")
      .addSelect("tigo.phone_number", "phonenumber")
      .addSelect("tigo.amount", "amount")
      .addSelect("tigo.status", "status")
      .addSelect("tigo.company_type", "companytype")
      .addSelect("tigo.userId", "userID")
      .where('tigo.id = :id', { id: id })
      .andWhere('tigo.userId = :userId', { userId })
      .getRawOne();
    } else if(comp_type === 'VODACOM') {
      userTransactions = await getRepository(Vodacom) 
      .createQueryBuilder("vodacom")
      .select("vodacom.id", "id")
      .addSelect("vodacom.transaction_type", "transactiontype")
      .addSelect("vodacom.phone_number", "phonenumber")
      .addSelect("vodacom.amount", "amount")
      .addSelect("vodacom.status", "status")
      .addSelect("vodacom.company_type", "companytype")
      .addSelect("vodacom.userId", "userID")
      .where('vodacom.id = :id', { id: id })
      .andWhere('vodacom.userId = :userId', { userId })
      .getRawOne();
    } else if(comp_type === 'HALOTEL') {
      userTransactions = await getRepository(Halotel) 
      .createQueryBuilder("halotel")
      .select("halotel.id", "id")
      .addSelect("halotel.transaction_type", "transactiontype")
      .addSelect("halotel.phone_number", "phonenumber")
      .addSelect("halotel.amount", "amount")
      .addSelect("halotel.status", "status")
      .addSelect("halotel.company_type", "companytype")
      .addSelect("halotel.userId", "userID")
      .where('halotel.id = :id', { id: id })
      .andWhere('halotel.userId = :userId', { userId: userId })
      .getRawOne();
    } else if(comp_type === 'AIRTEL') {
      userTransactions = await getRepository(Airtel) 
      .createQueryBuilder("airtel")
      .select("airtel.id", "id")
      .addSelect("airtel.transaction_type", "transactiontype")
      .addSelect("airtel.phone_number", "phonenumber")
      .addSelect("airtel.amount", "amount")
      .addSelect("airtel.status", "status")
      .addSelect("airtel.company_type", "companytype")
      .addSelect("airtel.userId", "userID")
      .where('airtel.id = :id', { id: id })
      .andWhere('airtel.userId = :userId', { userId: userId })
      .getRawOne();
    }

		return res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('9000-Server Error')
  }
})

// @route PUT  api/transaction/:id
// @desc Update transaction
// @access Private
router.put('/api/transaction/update/:id', auth, async (req: any, res: any) => {
  try {

		const { id , transactiontype, amount, companytype, phonenumber } = req.body;

    const tigoRepo = getRepository(Tigo); 

    if (companytype === 'TIGO') {
      
      await getConnection()
      .createQueryBuilder()
      .update(Tigo)
      .set({ 
        amount: amount, 
        phone_number: phonenumber, 
        transaction_type: transactiontype === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW, 
        status: TransactionStatus.APPROVED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(companytype === 'VODACOM') {

      await getConnection()
      .createQueryBuilder()
      .update(Vodacom)
      .set({ 
        amount: amount, 
        phone_number: phonenumber, 
        transaction_type: transactiontype === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW, 
        status: TransactionStatus.APPROVED
      })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(companytype === 'AIRTEL') {

      await getConnection()
      .createQueryBuilder()
      .update(Airtel)
      .set({ amount: amount, 
        phone_number: phonenumber, 
        transaction_type: transactiontype === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW, 
        status: TransactionStatus.APPROVED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    } else if(companytype === 'HALOTEL') {

      await getConnection()
      .createQueryBuilder()
      .update(Halotel)
      .set({ amount: amount, 
        phone_number: phonenumber, 
        transaction_type: transactiontype === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW, 
        status: TransactionStatus.APPROVED })
      .where("id = :id", { id: id })
      .andWhere('userId = :userId', { userId: parseInt(req.user.id) })
      .execute()

    }

		let userTransactions = null

    if (companytype === 'TIGO') {
      userTransactions = await getRepository(Tigo) 
      .createQueryBuilder("tigo")
      .select("tigo.id", "id")
      .addSelect("tigo.transaction_type", "transactiontype")
      .addSelect("tigo.phone_number", "phonenumber")
      .addSelect("tigo.amount", "amount")
      .addSelect("tigo.status", "status")
      .addSelect("tigo.company_type", "companytype")
      .addSelect("tigo.userId", "userID")
      .where('tigo.id = :id', { id: req.params.id })
      .andWhere('tigo.userId = :userId', { userId: req.user.id })
      .getRawOne();
    } else if(companytype === 'VODACOM') {
      userTransactions = await getRepository(Vodacom) 
      .createQueryBuilder("vodacom")
      .select("vodacom.id", "id")
      .addSelect("vodacom.transaction_type", "transactiontype")
      .addSelect("vodacom.phone_number", "phonenumber")
      .addSelect("vodacom.amount", "amount")
      .addSelect("vodacom.status", "status")
      .addSelect("vodacom.company_type", "companytype")
      .addSelect("vodacom.userId", "userID")
      .where('vodacom.id = :id', { id: req.params.id })
      .andWhere('vodacom.userId = :userId', { userId: req.user.id })
      .getRawOne();
    } else if(companytype === 'HALOTEL') {
      userTransactions = await getRepository(Halotel) 
      .createQueryBuilder("halotel")
      .select("halotel.id", "id")
      .addSelect("halotel.transaction_type", "transactiontype")
      .addSelect("halotel.phone_number", "phonenumber")
      .addSelect("halotel.amount", "amount")
      .addSelect("halotel.status", "status")
      .addSelect("halotel.company_type", "companytype")
      .addSelect("halotel.userId", "userID")
      .where('halotel.id = :id', { id: req.params.id })
      .andWhere('halotel.userId = :userId', { userId: req.user.id })
      .getRawOne();
    } else if(companytype === 'AIRTEL') {
      userTransactions = await getRepository(Airtel) 
      .createQueryBuilder("airtel")
      .select("airtel.id", "id")
      .addSelect("airtel.transaction_type", "transactiontype")
      .addSelect("airtel.phone_number", "phonenumber")
      .addSelect("airtel.amount", "amount")
      .addSelect("airtel.status", "status")
      .addSelect("airtel.company_type", "companytype")
      .addSelect("airtel.userId", "userID")
      .where('airtel.id = :id', { id: req.params.id })
      .andWhere('airtel.userId = :userId', { userId: req.user.id })
      .getRawOne();
    }


    // let result = await tigoRepo.manager.query(`SELECT id as transactionID, transaction_type as transactionType, phone_number as phonenumber, amount as amount, status as status, userId as userID FROM tigo WHERE userId = ${id} ORDER BY id DESC LIMIT 1`);

		res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


// @route GET  api/transactions/create
// @desc Create Transactions
// @access Private
router.post('/api/transaction/create', auth, async (req: any, res: any) => {
  try {
    const { id } = req.user;

		const { transactiontype, amount, companytype, phonenumber } = req.body;

    const userRepo = getRepository(Users); 
    const user = await userRepo.findOne({ id: parseInt( id )});

    let object = null

    if (companytype === 'TIGO') {
      object = await Tigo.create({ 
        amount : amount,
        phone_number : phonenumber,
        transaction_type : transactiontype === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW,
        status : TransactionStatus.APPROVED,
        userId : user?.id,
        user: user
      }).save()
      
      
    } else if(companytype === 'VODACOM') {

      await Vodacom.create({ 
        amount : amount,
        phone_number : phonenumber,
        transaction_type : transactiontype === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW,
        status : TransactionStatus.APPROVED,
        userId : user?.id,
        user: user
      }).save()

    } else if(companytype === 'AIRTEL') {

      await Airtel.create({ 
        amount : amount,
        phone_number : phonenumber,
        transaction_type : transactiontype === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW,
        status : TransactionStatus.APPROVED,
        userId : user?.id,
        user: user
      }).save()

    } else if(companytype === 'HALOTEL') {

      await Halotel.create({ 
        amount : amount,
        phone_number : phonenumber,
        transaction_type : transactiontype === "DEPOSIT" ? TransactionType.DEPOSIT : TransactionType.WITHDRAW,
        status : TransactionStatus.APPROVED,
        userId : user?.id,
        user: user
      }).save()
    }

    let userTransactions = null

    if (companytype === 'TIGO') {
      userTransactions = await getRepository(Tigo) 
      .createQueryBuilder("tigo")
      .select("tigo.id", "id")
      .addSelect("tigo.transaction_type", "transactiontype")
      .addSelect("tigo.phone_number", "phonenumber")
      .addSelect("tigo.amount", "amount")
      .addSelect("tigo.status", "status")
      .addSelect("tigo.company_type", "companytype")
      .addSelect("tigo.userId", "userID")
      .where('tigo.userId = :id', { id: id })
      .orderBy("tigo.id", "DESC")
      .getRawOne();
    } else if(companytype === 'VODACOM') {
      userTransactions = await getRepository(Vodacom) 
      .createQueryBuilder("vodacom")
      .select("vodacom.id", "id")
      .addSelect("vodacom.transaction_type", "transactiontype")
      .addSelect("vodacom.phone_number", "phonenumber")
      .addSelect("vodacom.amount", "amount")
      .addSelect("vodacom.status", "status")
      .addSelect("vodacom.company_type", "companytype")
      .addSelect("vodacom.userId", "userID")
      .where('vodacom.userId = :id', { id: id })
      .orderBy("vodacom.id", "DESC")
      .getRawOne();
    } else if(companytype === 'HALOTEL') {
      userTransactions = await getRepository(Halotel) 
      .createQueryBuilder("halotel")
      .select("halotel.id", "id")
      .addSelect("halotel.transaction_type", "transactiontype")
      .addSelect("halotel.phone_number", "phonenumber")
      .addSelect("halotel.amount", "amount")
      .addSelect("halotel.status", "status")
      .addSelect("halotel.company_type", "companytype")
      .addSelect("halotel.userId", "userID")
      .where('halotel.userId = :id', { id: id })
      .orderBy("halotel.id", "DESC")
      .getRawOne();
    } else if(companytype === 'AIRTEL') {
      userTransactions = await getRepository(Airtel) 
      .createQueryBuilder("airtel")
      .select("airtel.id", "id")
      .addSelect("airtel.transaction_type", "transactiontype")
      .addSelect("airtel.phone_number", "phonenumber")
      .addSelect("airtel.amount", "amount")
      .addSelect("airtel.status", "status")
      .addSelect("airtel.company_type", "companytype")
      .addSelect("airtel.userId", "userID")
      .where('airtel.userId = :id', { id: id })
      .orderBy("airtel.id", "DESC")
      .getRawOne();
    }

		res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/user
// @desc Get all trasactions for all user
// @access Private
router.get('/api/transactions/user/dev', auth, async (req: any, res: any) => {
  try {

    let userTransactions = await getRepository(Users) 
    .createQueryBuilder("user")
    .select("user.id")
    .addSelect("user.owner_id")
    .addSelect("user.first_name")
    .addSelect("user.user_name")
    .leftJoinAndSelect("user.tigo_transactions", "tigo")
    .leftJoinAndSelect("user.vodacom_transactions", "vodacom")
    .leftJoinAndSelect("user.airtel_transactions", "airtel")
    .leftJoinAndSelect("user.halotel_transactions", "halotel")
    .getMany();

    res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


// @route GET  api/transactions/tigo/
// @desc Get all trasactions for one user 
// @access Private
router.get('/api/transactions/:comp', auth, async (req: any, res: any) => {
  const { comp } = req.params;
  const { id } = req.user;
  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let userTransactions = null

    if (comp === 'TIGO') {

      userTransactions = await getRepository(Tigo).manager.query(`
        SELECT 
          id, 
          transaction_type AS transactiontype, 
          phone_number AS phonenumber, 
          amount, 
          status, 
          company_type AS companytype, 
          "tigo"."userId" AS userID
        FROM tigo 
        WHERE "tigo"."userId" = ${id} AND tigo.created_at::DATE = NOW()::DATE
        ORDER BY id DESC
      `)
    } else if(comp === 'VODACOM') {

      userTransactions = await getRepository(Vodacom).manager.query(`
        SELECT 
          id, 
          transaction_type AS transactiontype, 
          phone_number AS phonenumber, 
          amount, 
          status, 
          company_type AS companytype, 
          "vodacom"."userId" AS userID
        FROM vodacom 
        WHERE "vodacom"."userId" = ${id} AND vodacom.created_at::DATE = NOW()::DATE
        ORDER BY id DESC
      `)
    } else if(comp === 'HALOTEL') {

      userTransactions = await getRepository(Halotel).manager.query(`
        SELECT 
          id, 
          transaction_type AS transactiontype, 
          phone_number AS phonenumber, 
          amount, 
          status, 
          company_type AS companytype, 
          "halotel"."userId" AS userID
        FROM halotel 
        WHERE "halotel"."userId" = ${id} AND halotel.created_at::DATE = NOW()::DATE
        ORDER BY id DESC
      `)
    } else if(comp === 'AIRTEL') {
      userTransactions = await getRepository(Airtel).manager.query(`
        SELECT 
          id, 
          transaction_type AS transactiontype, 
          phone_number AS phonenumber, 
          amount, 
          status, 
          company_type AS companytype, 
          "airtel"."userId" AS userID
        FROM airtel 
        WHERE "airtel"."userId" = ${id} AND airtel.created_at::DATE = NOW()::DATE
        ORDER BY id DESC
      `)
    }

    res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


// @route GET  api/transactions/tigo/
// @desc Get all trasactions for one user 
// @access Private
router.get('/api/transactions/data/:comp', auth, async (req: any, res: any) => {
  const { comp } = req.params;
  const { id } = req.user;
  try {
    let user = await Users.findOne(parseInt(req.user.id));

    let isOwner = Boolean(user?.is_owner)

    let userTransactions = null

    if (comp === 'TIGO') {

      userTransactions = await getRepository(Tigo).manager.query(`
        SELECT 
          tigo.id, 
          users.user_name AS username,
          transaction_type AS transactiontype, 
          tigo.phone_number AS phonenumber, 
          amount, 
          tigo.status, 
          company_type AS companytype, 
          "tigo"."userId" AS userID, 
          TO_CHAR(tigo.created_at :: DATE, 'dd-Mon-yyyy')  AS dateTime, 
          TO_CHAR(tigo.created_at::TIME, 'HH12:MI:SS AM') AS recTime
        FROM tigo LEFT JOIN users ON "tigo"."userId" = users.id
        WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`}  AND tigo.created_at::DATE = NOW()::DATE
        ORDER BY tigo.id DESC
      `)
    } else if(comp === 'VODACOM') {

      userTransactions = await getRepository(Vodacom).manager.query(`
        SELECT 
          vodacom.id, 
          users.user_name AS username,
          transaction_type AS transactiontype, 
          vodacom.phone_number AS phonenumber, 
          amount, 
          vodacom.status, 
          company_type AS companytype, 
          "vodacom"."userId" AS userID, 
          TO_CHAR(vodacom.created_at :: DATE, 'dd-Mon-yyyy')  AS dateTime, 
          TO_CHAR(vodacom.created_at::TIME, 'HH12:MI:SS AM') AS recTime
        FROM vodacom LEFT JOIN users ON "vodacom"."userId" = users.id
        WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} AND vodacom.created_at::DATE = NOW()::DATE
        ORDER BY vodacom.id DESC
      `)
    } else if(comp === 'HALOTEL') {

      userTransactions = await getRepository(Halotel).manager.query(`
        SELECT 
          halotel.id, 
          users.user_name AS username,
          transaction_type AS transactiontype, 
          halotel.phone_number AS phonenumber, 
          amount, 
          halotel.status, 
          company_type AS companytype, 
          "halotel"."userId" AS userID, 
          TO_CHAR(halotel.created_at :: DATE, 'dd-Mon-yyyy')  AS dateTime, 
          TO_CHAR(halotel.created_at::TIME, 'HH12:MI:SS AM') AS recTime
        FROM halotel LEFT JOIN users ON "halotel"."userId" = users.id
        WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} AND halotel.created_at::DATE = NOW()::DATE
        ORDER BY halotel.id DESC
      `)
    } else if(comp === 'AIRTEL') {

      userTransactions = await getRepository(Airtel).manager.query(`
        SELECT 
          airtel.id, 
          users.user_name AS username,
          transaction_type AS transactionType, 
          airtel.phone_number AS phonenumber, 
          amount, 
          airtel.status, 
          company_type AS companytype, 
          "airtel"."userId" AS userID, 
          TO_CHAR(airtel.created_at :: DATE, 'dd-Mon-yyyy')  AS dateTime, 
          TO_CHAR(airtel.created_at::TIME, 'HH12:MI:SS AM') AS recTime
        FROM airtel LEFT JOIN users ON "airtel"."userId" = users.id
        WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} AND airtel.created_at::DATE = NOW()::DATE
        ORDER BY airtel.id DESC
      `)
    }

    res.json(userTransactions)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/tigo/
// @desc Get all trasactions for dashboard data for widgets
// @access Private
router.get('/api/transaction/dash/widgets', auth, async (req: any, res: any) => {

  const { id } = req.user;

  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let isOwner = Boolean(user?.is_owner)

    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` 
  WITH prev AS (
	SELECT  
	  ( 
		  SELECT COALESCE(SUM(tigo.amount), 0) 
		  FROM users LEFT JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE = NOW()::DATE - '1 DAY'::INTERVAL
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS tigo_yesterday,
	  ( 
		  SELECT COALESCE(SUM(vodacom.amount), 0) 
		  FROM users LEFT JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE = NOW()::DATE - '1 DAY'::INTERVAL
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS voda_yesterday,
	  ( 
		  SELECT COALESCE(SUM(halotel.amount), 0) 
		  FROM users LEFT JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE = NOW()::DATE - '1 DAY'::INTERVAL
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS halo_yesterday,
	  ( 
		  SELECT COALESCE(SUM(airtel.amount), 0) 
		  FROM users LEFT JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE = NOW()::DATE - '1 DAY'::INTERVAL
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS air_yesterday
    ), today AS (
      SELECT 
	  ( 
		  SELECT COALESCE(SUM(tigo.amount), 0) 
		  FROM users LEFT JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE = NOW()::DATE 
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS tigo_today,
	  ( 
		  SELECT COALESCE(SUM(vodacom.amount), 0) 
		  FROM users LEFT JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE = NOW()::DATE 
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS voda_today,
	  ( 
		  SELECT COALESCE(SUM(halotel.amount), 0) 
		  FROM users LEFT JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE = NOW()::DATE 
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS halo_today,
	  ( 
		  SELECT COALESCE(SUM(airtel.amount), 0) 
		  FROM users LEFT JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE = NOW()::DATE 
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS air_today
    )
    SELECT 
      ROUND((NULLIF(today.tigo_today, 0) / NULLIF(prev.tigo_yesterday,0) * 100), 0) - 100 AS tigo_percent,
      ROUND((NULLIF(today.voda_today,0) / NULLIF(prev.voda_yesterday,0) * 100), 0) - 100 AS voda_percent,
      ROUND((NULLIF(today.halo_today,0) / NULLIF(prev.halo_yesterday,0) * 100), 0) - 100 AS halo_percent,
      ROUND((NULLIF(today.air_today,0) / NULLIF(prev.air_yesterday,0) * 100), 0) - 100 AS air_percent,
      TO_CHAR(today.tigo_today, 'fm999G999D99') AS tigo_today, 
      TO_CHAR(today.voda_today, 'fm999G999D99') AS voda_today, 
      TO_CHAR(today.halo_today, 'fm999G999D99') AS halo_today, 
      TO_CHAR(today.air_today, 'fm999G999D99') AS air_today
    FROM today, prev;
     `);

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/tigo/
// @desc Get all trasactions for dashboard data for widgets
// @access Private
router.get('/api/transaction/dash/targets', auth, async (req: any, res: any) => {
  const { id } = req.user;
  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let isOwner = Boolean(user?.is_owner)

    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` 
    WITH lastMonth AS (
	  SELECT --(tigo_avg_month + voda_avg_month + halo_avg_month + air_avg_month ) AS comps_avg_month
	  ( 
		  SELECT COALESCE(SUM(tigo.amount) / 30, 0)
		  FROM users LEFT JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND tigo.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS tigo_avg_month,
	  ( 
		  SELECT COALESCE(SUM(vodacom.amount) / 30, 0) 
		  FROM users LEFT JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND vodacom.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS voda_avg_month,
	  ( 
		  SELECT COALESCE(SUM(halotel.amount) / 30, 0) 
		  FROM users LEFT JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND halotel.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS halo_avg_month,
	  ( 
		  SELECT COALESCE(SUM(airtel.amount) / 30, 0) 
		  FROM users LEFT JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND airtel.created_at::DATE < DATE_TRUNC('MONTH', CURRENT_DATE)
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS air_avg_month
    ), lastWeek AS (
	  SELECT --(tigo_avg_week + voda_avg_week + halo_avg_week + air_avg_week) AS comps_avg_week
	  ( 
		  SELECT COALESCE(SUM(tigo.amount) / 7, 0) 
		  FROM users LEFT JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE >= NOW()::DATE - EXTRACT(DOW FROM NOW())::INTEGER - 7 AND tigo.created_at::DATE < NOW()::DATE - EXTRACT(DOW from NOW())::INTEGER
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS tigo_avg_week,
	  ( 
		  SELECT COALESCE(SUM(vodacom.amount) / 7, 0) 
		  FROM users LEFT JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE >= NOW()::DATE - EXTRACT(DOW FROM NOW())::INTEGER - 7 AND vodacom.created_at::DATE < NOW()::DATE - EXTRACT(DOW from NOW())::INTEGER
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS voda_avg_week,
	  ( 
		  SELECT COALESCE(SUM(halotel.amount) / 7, 0) 
		  FROM users LEFT JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE >= DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '1' MONTH) AND halotel.created_at::DATE < NOW()::DATE - EXTRACT(DOW from NOW())::INTEGER
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS halo_avg_week,
	  ( 
		  SELECT COALESCE(SUM(airtel.amount) / 7, 0) 
		  FROM users LEFT JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE >= NOW()::DATE - EXTRACT(DOW FROM NOW())::INTEGER - 7 AND airtel.created_at::DATE < NOW()::DATE - EXTRACT(DOW from NOW())::INTEGER
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS air_avg_week
    ), today AS (
	  SELECT  --(tigo_today + voda_today + halo_today + air_today ) AS comps_today
	  ( 
		  SELECT COALESCE(SUM(tigo.amount), 0) 
		  FROM users LEFT JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND tigo.created_at::DATE = NOW()::DATE 
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS tigo_today,
	  ( 
		  SELECT COALESCE(SUM(vodacom.amount), 0) 
		  FROM users LEFT JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND vodacom.created_at::DATE = NOW()::DATE 
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS voda_today,
	  ( 
		  SELECT COALESCE(SUM(halotel.amount), 0) 
		  FROM users LEFT JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND halotel.created_at::DATE = NOW()::DATE 
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS halo_today,
	  ( 
		  SELECT COALESCE(SUM(airtel.amount), 0) 
		  FROM users LEFT JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND airtel.created_at::DATE = NOW()::DATE 
		  WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} 
	  ) AS air_today
    )
      SELECT 
      ROUND(lastMonth.tigo_avg_month + lastMonth.voda_avg_month + lastMonth.halo_avg_month + lastMonth.air_avg_month, 2) AS comps_avg_month, ROUND(lastWeek.tigo_avg_week + lastWeek.voda_avg_week + lastWeek.halo_avg_week + lastWeek.air_avg_week, 2) AS comps_avg_week,  ROUND(today.tigo_today + today.voda_today + today.halo_today + today.air_today, 2) AS comps_today,
      ROUND((lastMonth.tigo_avg_month + lastMonth.voda_avg_month + lastMonth.halo_avg_month + lastMonth.air_avg_month + lastWeek.tigo_avg_week + lastWeek.voda_avg_week + lastWeek.halo_avg_week + lastWeek.air_avg_week) / 2, 2) AS comps_target,
      ROUND((NULLIF(today.tigo_today + today.voda_today + today.halo_today + today.air_today, 0) / (NULLIF(lastMonth.tigo_avg_month + lastMonth.voda_avg_month + lastMonth.halo_avg_month + lastMonth.air_avg_month + lastWeek.tigo_avg_week + lastWeek.voda_avg_week + lastWeek.halo_avg_week + lastWeek.air_avg_week, 0) / 2)) * 100, 2) AS comp_percentage
      FROM lastMonth, lastWeek, today
     `);

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


// @route GET  api/transactions/dash/chart
// @desc Get all trasactions for the dashboard chart for the last six months
// @access Private
router.get('/api/transaction/dash/chart', auth, async (req: any, res: any) => {

  const { id } = req.user;

  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let isOwner = Boolean(user?.is_owner)

    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` WITH tigo_summary AS (
      SELECT  
      TO_CHAR(tigo.created_at, 'MM/YYYY') AS month_year, 
      TO_CHAR(tigo.created_at, 'Month') AS comps_month,
      COALESCE(SUM(tigo.amount), 0) AS tigo_sum
      FROM users
      INNER JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND TO_CHAR(tigo.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`}
      GROUP BY TO_CHAR(tigo.created_at, 'MM/YYYY'), TO_CHAR(tigo.created_at, 'Month')
    ), voda_summary AS (
      SELECT  COALESCE(SUM(vodacom.amount), 0) AS voda_sum
      FROM users
      INNER JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND TO_CHAR(vodacom.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`}
    ) , halo_summary AS (
      SELECT  COALESCE(SUM(halotel.amount), 0) AS halo_sum
      FROM users
      INNER JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND TO_CHAR(halotel.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`}
    ) , air_summary AS (
      SELECT  COALESCE(SUM(airtel.amount), 0) AS air_sum
      FROM users
      INNER JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND TO_CHAR(airtel.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`}
    )
    SELECT TRIM(tigo_summary.comps_month) AS name, voda_sum AS voda, tigo_sum AS tigo, halo_sum AS halo, air_sum AS airtel FROM tigo_summary, voda_summary, halo_summary, air_summary
     `);

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


// @route GET  api/transactions/dash/chart
// @desc Get all trasactions for the dashboard chart for the last six months for specific user
// @access Private
router.get('/api/transaction/dash/chart/:id', auth, async (req: any, res: any) => {

  const { id } = req.params;

  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let isOwner = Boolean(user?.is_owner)

    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` WITH tigo_summary AS (
      SELECT  
      TO_CHAR(tigo.created_at, 'MM/YYYY') AS month_year, 
      TO_CHAR(tigo.created_at, 'Month') AS comps_month,
      COALESCE(SUM(tigo.amount), 0) AS tigo_sum
      FROM users
      INNER JOIN tigo ON users.id= "tigo"."userId" AND tigo.status = 'Approved' AND TO_CHAR(tigo.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE users.id = ${id}
      GROUP BY TO_CHAR(tigo.created_at, 'MM/YYYY'), TO_CHAR(tigo.created_at, 'Month')
    ), voda_summary AS (
      SELECT  COALESCE(SUM(vodacom.amount), 0) AS voda_sum
      FROM users
      INNER JOIN vodacom ON users.id= "vodacom"."userId" AND vodacom.status = 'Approved' AND TO_CHAR(vodacom.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE users.id = ${id}
    ) , halo_summary AS (
      SELECT  COALESCE(SUM(halotel.amount), 0) AS halo_sum
      FROM users
      INNER JOIN halotel ON users.id= "halotel"."userId" AND halotel.status = 'Approved' AND TO_CHAR(halotel.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE users.id = ${id}
    ) , air_summary AS (
      SELECT  COALESCE(SUM(airtel.amount), 0) AS air_sum
      FROM users
      INNER JOIN airtel ON users.id= "airtel"."userId" AND airtel.status = 'Approved' AND TO_CHAR(airtel.created_at, 'MM/YYYY') IN (SELECT TO_CHAR(MONTHS, 'MM/YYYY') FROM GENERATE_SERIES( DATE_TRUNC('MONTH', CURRENT_DATE - INTERVAL '6 MONTHS'), DATE_TRUNC('MONTH', CURRENT_DATE), '1 MONTH':: INTERVAL) AS MONTHS )
      WHERE users.id = ${id}
    )
    SELECT TRIM(tigo_summary.comps_month) AS name, voda_sum AS voda, tigo_sum AS tigo, halo_sum AS halo, air_sum AS airtel FROM tigo_summary, voda_summary, halo_summary, air_summary
     `);

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/dash/table
// @desc Get all trasactions for dashboard datatable
// @access Private
router.get('/api/transaction/dash/datatable', auth, async (req: any, res: any) => {

  const { id } = req.user;

  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let isOwner = Boolean(user?.is_owner)

    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` 
    SELECT
    row_number() OVER (ORDER BY notid) AS id,*
    FROM (
      SELECT tigo.id AS notid, transaction_type::VARCHAR AS transactionType, SUBSTRING(tigo.phone_number from 1 for 4) || '-' || SUBSTRING(tigo.phone_number from '......$')  AS phonenumber, TRIM(TRAILING '.' FROM TO_CHAR(amount, 'fm999G999D99')) AS amount, company_type AS companyType, "userId" AS userID, TO_CHAR(tigo.created_at::TIME, 'HH12:MI:SS AM') AS recTime, 'Approved' AS status
      FROM tigo INNER JOIN users ON tigo."userId" = users.id
      WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} AND tigo.status = 'Approved' AND tigo.created_at::DATE = NOW()::DATE
      UNION
      SELECT vodacom.id AS notid, transaction_type::VARCHAR AS transactionType, SUBSTRING(vodacom.phone_number from 1 for 4) || '-' || SUBSTRING(vodacom.phone_number from '......$') AS phonenumber, TRIM(TRAILING '.' FROM TO_CHAR(amount, 'fm999G999D99')) AS amount , company_type AS companyType, "userId" AS userID, TO_CHAR(vodacom.created_at::TIME, 'HH12:MI:SS AM') AS recTime, 'Approved' AS status
      FROM vodacom INNER JOIN users ON vodacom."userId" = users.id
      WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} AND vodacom.status = 'Approved' AND vodacom.created_at::DATE = NOW()::DATE
      UNION
      SELECT halotel.id AS notid, transaction_type::VARCHAR AS transactionType, SUBSTRING(halotel.phone_number from 1 for 4) || '-' || SUBSTRING(halotel.phone_number from '......$') AS phonenumber, TRIM(TRAILING '.' FROM TO_CHAR(amount, 'fm999G999D99')) AS amount , company_type AS companyType, "userId" AS userID, TO_CHAR(halotel.created_at::TIME, 'HH12:MI:SS AM') AS recTime, 'Approved' AS status
      FROM halotel INNER JOIN users ON halotel."userId" = users.id
      WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} AND halotel.status = 'Approved' AND halotel.created_at::DATE = NOW()::DATE
      UNION
      SELECT airtel.id AS notid, transaction_type::VARCHAR AS transactionType, SUBSTRING(airtel.phone_number from 1 for 4) || '-' || SUBSTRING(airtel.phone_number from '......$') AS phonenumber, TRIM(TRAILING '.' FROM TO_CHAR(amount, 'fm999G999D99')) AS amount, company_type AS companyType, "userId" AS userID, TO_CHAR(airtel.created_at::TIME, 'HH12:MI:SS AM') AS recTime, 'Approved' AS status
      FROM airtel INNER JOIN users ON airtel."userId" = users.id
      WHERE ${isOwner === true ? `users.owner_id = ${id}` : `users.id = ${id}`} AND airtel.status = 'Approved' AND airtel.created_at::DATE = NOW()::DATE
      ORDER BY companyType DESC
    ) AS foo
    ORDER BY recTime DESC
    `);

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})

// @route GET  api/transactions/dash/table
// @desc Get all trasactions for dashboard datatable
// @access Private
router.get('/api/transaction/dash/datatable/:id', auth, async (req: any, res: any) => {

  const { id } = req.params;

  try {

    let user = await Users.findOne(parseInt(req.user.id));

    let isOwner = Boolean(user?.is_owner)

    const tigoRepo = getRepository(Tigo);
    let result = await tigoRepo.manager.query(
    ` 
    SELECT
    row_number() OVER (ORDER BY notid) AS id,*
    FROM (
      SELECT tigo.id AS notid, transaction_type::VARCHAR AS transactionType, SUBSTRING(tigo.phone_number from 1 for 4) || '-' || SUBSTRING(tigo.phone_number from '......$')  AS phonenumber, TRIM(TRAILING '.' FROM TO_CHAR(amount, 'fm999G999D99')) AS amount, company_type AS companyType, "userId" AS userID, TO_CHAR(tigo.created_at :: DATE, 'dd-Mon-yyyy') AS dateTime, 'Approved' AS status
      FROM tigo INNER JOIN users ON tigo."userId" = users.id
      WHERE users.id = ${id} AND tigo.status = 'Approved' AND tigo.created_at::DATE = NOW()::DATE
      UNION
      SELECT vodacom.id AS notid, transaction_type::VARCHAR AS transactionType, SUBSTRING(vodacom.phone_number from 1 for 4) || '-' || SUBSTRING(vodacom.phone_number from '......$') AS phonenumber, TRIM(TRAILING '.' FROM TO_CHAR(amount, 'fm999G999D99')) AS amount , company_type AS companyType, "userId" AS userID, TO_CHAR(vodacom.created_at :: DATE, 'dd-Mon-yyyy') AS dateTime, 'Approved' AS status
      FROM vodacom INNER JOIN users ON vodacom."userId" = users.id
      WHERE users.id = ${id} AND vodacom.status = 'Approved' AND vodacom.created_at::DATE = NOW()::DATE
      UNION
      SELECT halotel.id AS notid, transaction_type::VARCHAR AS transactionType, SUBSTRING(halotel.phone_number from 1 for 4) || '-' || SUBSTRING(halotel.phone_number from '......$') AS phonenumber, TRIM(TRAILING '.' FROM TO_CHAR(amount, 'fm999G999D99')) AS amount , company_type AS companyType, "userId" AS userID, TO_CHAR(halotel.created_at :: DATE, 'dd-Mon-yyyy') AS dateTime, 'Approved' AS status
      FROM halotel INNER JOIN users ON halotel."userId" = users.id
      WHERE users.id = ${id} AND halotel.status = 'Approved' AND halotel.created_at::DATE = NOW()::DATE
      UNION
      SELECT airtel.id AS notid, transaction_type::VARCHAR AS transactionType, SUBSTRING(airtel.phone_number from 1 for 4) || '-' || SUBSTRING(airtel.phone_number from '......$') AS phonenumber, TRIM(TRAILING '.' FROM TO_CHAR(amount, 'fm999G999D99')) AS amount, company_type AS companyType, "userId" AS userID, TO_CHAR(airtel.created_at :: DATE, 'dd-Mon-yyyy') AS dateTime, 'Approved' AS status
      FROM airtel INNER JOIN users ON airtel."userId" = users.id
      WHERE users.id = ${id} AND airtel.status = 'Approved' AND airtel.created_at::DATE = NOW()::DATE
      ORDER BY companyType DESC
    ) AS foo
    ORDER BY dateTime DESC
    `);

    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).send('8000-Server Error')
  }
})


export { router as trasactions };
