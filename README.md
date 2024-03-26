### GROUP NAME

DB.**jar**

### GROUP MEMBERS

**J**effrey Wong  
**A**nnie He  
**R**icky Cui

### MEMBER EMAILS

- annie.he@cooper.edu
- jeffrey.wong@cooper.edu
- ricky.cui@cooper.edu

### PROJECT NAME

SQLib: Solid Quality Library

### DESCRIPTION

lorem ipsum dolor sit amet, consectetur adipiscing el aspect, sed do eiusmod tempor incididunt ut labore et dolore mag en iacute vel mag et dolore magna aliqua. Ut enim ad minim ven

### TECH STACK

- **Next.js**: fullstack framework.
- **Prisma**: ORM for Node.js.
- **PostgreSQL**: relational database.

  #### Additional Tools

- **Docker**: containerization.
- **Git**: version control.

  #### To be implemented

- **AWS EC2/ECS**: cloud hosting.
- **Apache/Nginx**?: serving.

### DATABASE MODELS

`next/prisma/schema.prisma`
- primary entity **user**
```prisma
// accounts can be logged in with email
model user {
  uid         String        @id @default(uuid())
  password    String
  dob         DateTime
  email       String        @unique
  uname       String
  image       String?
  first_name  String
  last_name   String
  role        String        @default("reader")
}
```
- primary entity **publication**
```prisma
// an edition/version of a book
model publication {
  pid           String          @id @default(uuid())
  isbn          String?
  file          String
  edition       String?
  num_pages     Int
  cover         String
}
```
- dependent entities **book**, **tag**, **series**, **author**, **publisher**, **language**
```prisma
// one or many publications that share name and certain authors
model book {
  bid            String           @id @default(uuid())
  description    String?
  bname          String
}
// a tag can be assigned to a book
model tag {
  tid        String       @id @default(uuid())
  tname      String
}
// one or many publications can be in a series
model series {
  sid         String        @id @default(uuid())
  sname       String
}
// authors are usually created automatically from unique name, but when duplicated names happen, dob is used
model author {
  aid            String           @id @default(uuid())
  aname          String
  description    String?
  dob            DateTime?
}
// publishers are created from unique names
model publisher {
  cid       String      @id @default(uuid())
  pname     String
}
// languages are assigned to publications
model language {
  lid       String      @id @default(uuid())
  lname     String
}
```
- relationships
```prisma
// relationship between publication and book
model pubInBook {
  bid         String
  pid         String
  @@id([bid, pid])
}
// relationship between book and tag
model bookHasTag {
  bid  String
  tid  String
  @@id([bid, tid])
}
// relationship between publication and series
model pubInSeries {
  pid         String
  sid         String
  psid        Int?
  @@id([pid, sid])
}
// relationship between author and publication
model authWritesPub {
  aid         String
  pid         String
  role        String?
  @@id([aid, pid])
}
// relationship between author and book
model authWritesBook {
  aid    String
  bid    String
  role   String?
  @@id([aid, bid])
}
// relationship between publisher and publication
model pubPubPub {
  cid         String
  year        Int
  pid         String
  @@id([cid, pid])
}
// relationship between publication and language
model pubInLang {
  pid         String
  lid         String
  @@id([pid, lid])
}
// relationship between user and uploaded publications
model userUploads {
  uid         String
  pid         String
  @@id([uid, pid])
}
// relationship between user and anything the user followed
model userFollows {
  uid  String
  fid  String
  type String
  @@id([uid, fid, type])
}
```

### TYPES OF USERS

- **reader**: can read books, follow things, and manage self (cannot edit role).
- **contributor**: in addition to readers, can upload and manage* their own uploads.
- **manager**: in addition to contributors, can manage other entities (except for user).
- **admin**: in addition to managers, can manage all users (cannot edit personal fields).

  \* manage: edit or delete  

### FUNCTIONS

- signIn
- signOut
- signUp

  #### To be implemented

- deleteSelf
- deleteUser
- follow
- unfollow
- uploadPub
- editPub
- deletePub
- editSelf
- editRole
- getRecommended
- getFollowed
- getSearched
- mergeDep
- deleteDep