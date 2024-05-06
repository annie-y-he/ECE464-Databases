const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient()

const transactions = [
  prisma.book.upsert({ where: { bname: 'The Forgotten Symphony' }, update: { description: 'A haunting tale of lost love and redemption set against the backdrop of war-torn Europe.' }, create: { bname: 'The Forgotten Symphony', description: 'A haunting tale of lost love and redemption set against the backdrop of war-torn Europe.' }, }),
  prisma.book.upsert({ where: { bname: 'Echoes of Eternity' }, update: { description: 'An epic fantasy saga filled with magic, betrayal, and the struggle for power in a world on the brink of destruction.' }, create: { bname: 'Echoes of Eternity', description: 'An epic fantasy saga filled with magic, betrayal, and the struggle for power in a world on the brink of destruction.' }, }),
  prisma.book.upsert({ where: { bname: 'The Secret Garden of Serenity' }, update: { description: 'A heartwarming story of healing and friendship, where a neglected garden becomes the catalyst for transformation.' }, create: { bname: 'The Secret Garden of Serenity', description: 'A heartwarming story of healing and friendship, where a neglected garden becomes the catalyst for transformation.' }, }),
  prisma.book.upsert({ where: { bname: 'Whispers in the Mist' }, update: { description: 'A gripping mystery shrouded in secrets and deception, where nothing is as it seems in a quaint coastal town.' }, create: { bname: 'Whispers in the Mist', description: 'A gripping mystery shrouded in secrets and deception, where nothing is as it seems in a quaint coastal town.' }, }),
  prisma.book.upsert({ where: { bname: 'The Art of Forgetting' }, update: { description: 'A poignant exploration of memory, identity, and the enduring power of human connection in the face of adversity.' }, create: { bname: 'The Art of Forgetting', description: 'A poignant exploration of memory, identity, and the enduring power of human connection in the face of adversity.' }, }),
  prisma.book.upsert({ where: { bname: 'Sands of Time' }, update: { description: 'An exhilarating adventure across ancient deserts and lost civilizations, where danger lurks at every turn.' }, create: { bname: 'Sands of Time', description: 'An exhilarating adventure across ancient deserts and lost civilizations, where danger lurks at every turn.' }, }),
  prisma.book.upsert({ where: { bname: 'The Midnight Library' }, update: { description: 'A magical journey through parallel worlds and alternate realities, where every choice leads to a new destiny.' }, create: { bname: 'The Midnight Library', description: 'A magical journey through parallel worlds and alternate realities, where every choice leads to a new destiny.' }, }),
  prisma.book.upsert({ where: { bname: 'Infinite Horizons' }, update: { description: 'A visionary exploration of the cosmos and the limitless possibilities of the human spirit, spanning galaxies and lifetimes.' }, create: { bname: 'Infinite Horizons', description: 'A visionary exploration of the cosmos and the limitless possibilities of the human spirit, spanning galaxies and lifetimes.' }, }),
  prisma.book.upsert({ where: { bname: 'The Song of Silver Falls' }, update: { description: 'A lyrical ode to nature\'s beauty and the enduring bond between humanity and the natural world.' }, create: { bname: 'The Song of Silver Falls', description: 'A lyrical ode to nature\'s beauty and the enduring bond between humanity and the natural world.' }, }),
  prisma.book.upsert({ where: { bname: 'Shadows of the Past' }, update: { description: 'A gripping historical drama set against the backdrop of World War II, where love and courage triumph over the darkest of times.' }, create: { bname: 'Shadows of the Past', description: 'A gripping historical drama set against the backdrop of World War II, where love and courage triumph over the darkest of times.' }, }),
  // Add more entries if needed
];

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

  const result = await prisma.$transaction(transactions);

  console.log({ annie, jeffrey, ricky, result })
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