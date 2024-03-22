CREATE TABLE publication (
  pid uuid DEFAULT uuid_generate_v4 (),
  isbn char(13),
  file text NOT NULL,
  edition text NOT NULL,
  num_pages integer,
  cover text,
  PRIMARY KEY (pid),
)

CREATE TABLE book (
  bid uuid DEFAULT uuid_generate_v4 (),
  description text,
  bname text NOT NULL,
  PRIMARY KEY (bid),
)

CREATE TABLE pubisbook (
  bid uuid,
  pid uuid,
  FOREIGN KEY (bid) REFERENCES book,
  FOREIGN KEY (pid) REFERENCES publication,
  PRIMARY KEY (bid, pid),
)

CREATE TABLE tag (
  tname text NOT NULL,
  PRIMARY KEY (tname),
)

CREATE TABLE bookhastag (
  bid uuid,
  tname text,
  FOREIGN KEY (bid) REFERENCES book,
  FOREIGN KEY (tname) REFERENCES tag,
  PRIMARY KEY (bid, tname),
)

CREATE TABLE series (
  sid uuid DEFAULT uuid_generate_v4 (),
  sname text NOT NULL,
  PRIMARY KEY sid,
)

CREATE TABLE pubinseries (
  pid uuid,
  sid uuid,
  psid int,
  PRIMARY KEY (pid, sid),
  FOREIGN KEY (pid) REFERENCES publication,
  FOREIGN KEY (sid) REFERENCES series,
)

CREATE TABLE author (
  aid uuid DEFAULT uuid_generate_v4 (),
  aname text NOT NULL,
  description text,
  dob date,
  dod date,
  PRIMARY KEY (aid),
)

CREATE TABLE authwpub (
  aid uuid,
  pid uuid,
  PRIMARY KEY (aid, pid),
)

CREATE TABLE authwbook (
  aid uuid,
  bid uuid,
  PRIMARY KEY (aid, bid),
)

CREATE TABLE publisher (
  pname text NOT NULL,
  PRIMARY KEY (pname),
)

CREATE TABLE publishes (
  pname text NOT NULL,
  year integer NOT NULL,
  pid uuid NOT NULL,
  FOREIGN KEY (pid) REFERENCES publication,
  FOREIGN KEY (pname) REFERENCES publisher,
  PRIMARY KEY (pname, pid),
)

-- one language beloing to another?
CREATE TABLE language (
  lname text NOT NULL,
  PRIMARY KEY (lname),
)

CREATE TABLE pubinlang (
  pid uuid,
  lname text,
  PRIMARY KEY (pid, lname),
  FOREIGN KEY (pid) REFERENCES publication,
  FOREIGN KEY (lname) REFERENCES language,
)

CREATE TABLE authwlang (
  aid uuid,
  lname text,
  PRIMARY KEY (aid, lname),
)

-- password encryption?
CREATE TABLE user (
  uid uuid DEFAULT uuid_generate_v4 (),
  password text,
  dob date,
  email text,
  uname text,
  first_name text,
  last_name text,
  PRIMARY KEY (uid),
)

CREATE TABLE userannopub (
  uid uuid,
  pid uuid,
  file text,
  PRIMARY KEY (uid, pid),
)

CREATE TABLE useruppub (
  uid uuid,
  pid uuid,
  PRIMARY KEY (uid, pid),
)

CREATE TABLE userfollow (
  uidER uuid,
  uidEE uuid,
  PRIMARY KEY (uidER, uidEE),
)

CREATE TABLE userlikelang (
  uid uuid,
  lname text,
  PRIMARY KEY (uid, lname),
)

CREATE TABLE userlikepub (
  uid uuid,
  pid uuid,
  PRIMARY KEY (uid, pid),
)

CREATE TABLE userlikebook (
  uid uuid,
  bid uuid,
  PRIMARY KEY (uid, bid),
)

CREATE TABLE userlikeauth (
  uid uuid,
  aid uuid,
  PRIMARY KEY (uid, aid),
)

CREATE TABLE userliketag (
  uid uuid,
  tname text,
  PRIMARY KEY (uid, tname),
)

CREATE TABLE userlikeseries (
  uid uuid,
  sid uuid,
  PRIMARY KEY (uid, sid),
)
