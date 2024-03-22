const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient()
async function main() {
  const annie = await prisma.user.upsert({
    where: { email: 'annie.he@cooper.edu' },
    update: {},
    create: {
      email: 'annie.he@cooper.edu',
      uname: 'inkcherry',
      password: await bcrypt.hash('anniepassword', 10),
      first_name: 'Annie',
      last_name: 'He',
      role: 'admin',
      dob: new Date(2000, 10, 26),
    },
  });
  const jeffrey = await prisma.user.upsert({
    where: { email: 'jeffrey.wong@cooper.edu' },
    update: {},
    create: {
      email: 'jeffrey.wong@cooper.edu',
      uname: 'justanothernerd2025',
      password: await bcrypt.hash('jeffreypassword', 10),
      first_name: 'Jeffrey',
      last_name: 'Wong',
      role: 'manager',
      dob: new Date(2003, 9, 21),
    },
  });
  const ricky = await prisma.user.upsert({
    where: { email: 'ricky.cui@cooper.edu' },
    update: {},
    create: {
      email: 'ricky.cui@cooper.edu',
      uname: 'syyrion',
      password: await bcrypt.hash('rickypassword', 10),
      first_name: 'Ricky',
      last_name: 'Cui',
      role: 'contributor',
      dob: new Date(2003, 7, 4),
    },
  });
  console.log({ annie, jeffrey, ricky })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })