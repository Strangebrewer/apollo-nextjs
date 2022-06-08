import 'dotenv/config';
import '../dist/db/index'
import bcrypt from 'bcryptjs';

const pw = bcrypt.hashSync("1234", bcrypt.genSaltSync(10));

import { Account, Bill, Category, Transaction, User } from '../dist/db/models';

import accountsSeed from './accounts.json';
import billsSeed from './bills.json';
import categoriesSeed from './categories.json';
import usersSeed from './users.json';

async function seed() {
  try {
    await User.deleteMany({});
    await Account.deleteMany({});
    await Bill.deleteMany({});
    await Category.deleteMany({});
    await Transaction.deleteMany({});

    usersSeed.forEach(u => u.password = pw);

    const users = await User.collection.insertMany(usersSeed);

    categoriesSeed.forEach(c => {
      c.user = users.insertedIds[0];
    });

    await Category.collection.insertMany(categoriesSeed);
    const categories = await Category.find();

    accountsSeed.forEach(a => {
      a.user = users.insertedIds[0];
    });

    await Account.collection.insertMany(accountsSeed)

    const accounts = await Account.find();
    
    const checking = accounts.find(a => a.name === 'SACU Checking');

    billsSeed.forEach(b => {
      b.user = users.insertedIds[0];
      b.source = checking._id;
      b.category = categories[Math.floor(Math.random() * categories.length)]._id;
    });

    const bills = await Bill.collection.insertMany(billsSeed);

    // log insertion counts:
    console.log("***********Aaaaaand, here's your insert counts:*************");
    console.log(users.insertedCount + " user records inserted!");
    console.log(accounts.length + " account records inserted!");
    console.log(bills.insertedCount + " bill records inserted!");
    console.log(categories.length + " category records inserted!");

    process.exit(0);
  } catch (error) {
    console.log('error:::', error);
    process.exit(1);
  }
}

seed();
