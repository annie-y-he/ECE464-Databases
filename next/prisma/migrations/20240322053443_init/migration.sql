-- CreateTable
CREATE TABLE "user" (
    "uid" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "uname" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'reader',

    CONSTRAINT "user_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "publication" (
    "pid" TEXT NOT NULL,
    "isbn" CHAR(13),
    "file" TEXT NOT NULL,
    "edition" TEXT,
    "num_pages" INTEGER NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "publication_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "book" (
    "bid" TEXT NOT NULL,
    "description" TEXT,
    "bname" TEXT NOT NULL,

    CONSTRAINT "book_pkey" PRIMARY KEY ("bid")
);

-- CreateTable
CREATE TABLE "tag" (
    "tid" TEXT NOT NULL,
    "tname" TEXT NOT NULL,

    CONSTRAINT "tag_pkey" PRIMARY KEY ("tid")
);

-- CreateTable
CREATE TABLE "series" (
    "sid" TEXT NOT NULL,
    "sname" TEXT NOT NULL,

    CONSTRAINT "series_pkey" PRIMARY KEY ("sid")
);

-- CreateTable
CREATE TABLE "author" (
    "aid" TEXT NOT NULL,
    "aname" TEXT NOT NULL,
    "description" TEXT,
    "dob" TIMESTAMP(3),

    CONSTRAINT "author_pkey" PRIMARY KEY ("aid")
);

-- CreateTable
CREATE TABLE "publisher" (
    "cid" TEXT NOT NULL,
    "pname" TEXT NOT NULL,

    CONSTRAINT "publisher_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "language" (
    "lid" TEXT NOT NULL,
    "lname" TEXT NOT NULL,

    CONSTRAINT "language_pkey" PRIMARY KEY ("lid")
);

-- CreateTable
CREATE TABLE "pubInBook" (
    "bid" TEXT NOT NULL,
    "pid" TEXT NOT NULL,

    CONSTRAINT "pubInBook_pkey" PRIMARY KEY ("bid","pid")
);

-- CreateTable
CREATE TABLE "bookHasTag" (
    "bid" TEXT NOT NULL,
    "tid" TEXT NOT NULL,

    CONSTRAINT "bookHasTag_pkey" PRIMARY KEY ("bid","tid")
);

-- CreateTable
CREATE TABLE "pubInSeries" (
    "pid" TEXT NOT NULL,
    "sid" TEXT NOT NULL,
    "psid" INTEGER,

    CONSTRAINT "pubInSeries_pkey" PRIMARY KEY ("pid","sid")
);

-- CreateTable
CREATE TABLE "authWritesPub" (
    "aid" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "authWritesPub_pkey" PRIMARY KEY ("aid","pid")
);

-- CreateTable
CREATE TABLE "authWritesBook" (
    "aid" TEXT NOT NULL,
    "bid" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "authWritesBook_pkey" PRIMARY KEY ("aid","bid")
);

-- CreateTable
CREATE TABLE "pubPubPub" (
    "cid" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "pid" TEXT NOT NULL,

    CONSTRAINT "pubPubPub_pkey" PRIMARY KEY ("cid","pid")
);

-- CreateTable
CREATE TABLE "pubInLang" (
    "pid" TEXT NOT NULL,
    "lid" TEXT NOT NULL,

    CONSTRAINT "pubInLang_pkey" PRIMARY KEY ("pid","lid")
);

-- CreateTable
CREATE TABLE "userUploads" (
    "uid" TEXT NOT NULL,
    "pid" TEXT NOT NULL,

    CONSTRAINT "userUploads_pkey" PRIMARY KEY ("uid","pid")
);

-- CreateTable
CREATE TABLE "userFollows" (
    "uid" TEXT NOT NULL,
    "fid" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "userFollows_pkey" PRIMARY KEY ("uid","fid","type")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "pubInBook" ADD CONSTRAINT "pubInBook_bid_fkey" FOREIGN KEY ("bid") REFERENCES "book"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pubInBook" ADD CONSTRAINT "pubInBook_pid_fkey" FOREIGN KEY ("pid") REFERENCES "publication"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookHasTag" ADD CONSTRAINT "bookHasTag_bid_fkey" FOREIGN KEY ("bid") REFERENCES "book"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookHasTag" ADD CONSTRAINT "bookHasTag_tid_fkey" FOREIGN KEY ("tid") REFERENCES "tag"("tid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pubInSeries" ADD CONSTRAINT "pubInSeries_pid_fkey" FOREIGN KEY ("pid") REFERENCES "publication"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pubInSeries" ADD CONSTRAINT "pubInSeries_sid_fkey" FOREIGN KEY ("sid") REFERENCES "series"("sid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authWritesPub" ADD CONSTRAINT "authWritesPub_aid_fkey" FOREIGN KEY ("aid") REFERENCES "author"("aid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authWritesPub" ADD CONSTRAINT "authWritesPub_pid_fkey" FOREIGN KEY ("pid") REFERENCES "publication"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authWritesBook" ADD CONSTRAINT "authWritesBook_aid_fkey" FOREIGN KEY ("aid") REFERENCES "author"("aid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authWritesBook" ADD CONSTRAINT "authWritesBook_bid_fkey" FOREIGN KEY ("bid") REFERENCES "book"("bid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pubPubPub" ADD CONSTRAINT "pubPubPub_cid_fkey" FOREIGN KEY ("cid") REFERENCES "publisher"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pubPubPub" ADD CONSTRAINT "pubPubPub_pid_fkey" FOREIGN KEY ("pid") REFERENCES "publication"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pubInLang" ADD CONSTRAINT "pubInLang_pid_fkey" FOREIGN KEY ("pid") REFERENCES "publication"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pubInLang" ADD CONSTRAINT "pubInLang_lid_fkey" FOREIGN KEY ("lid") REFERENCES "language"("lid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userUploads" ADD CONSTRAINT "userUploads_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userUploads" ADD CONSTRAINT "userUploads_pid_fkey" FOREIGN KEY ("pid") REFERENCES "publication"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userFollows" ADD CONSTRAINT "userFollows_uid_fkey" FOREIGN KEY ("uid") REFERENCES "user"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
