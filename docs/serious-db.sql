CREATE TABLE publication (
  pid uuid DEFAULT uuid_generate_v4 (),
  isbn char(13),
  path text NOT NULL,
  edition text NOT NULL,
  num_pages integer,
  PRIMARY KEY (pid),
)

CREATE TABLE book (
  bid uuid DEFAULT uuid_generate_v4 (),
  description text,
  bname text NOT NULL,
  PRIMARY KEY (bid),
  first_page_content char(4096),
  second_page_content char(4096),
  inode_number int,
  accessed boolean,
  dirty boolean,
  page_frame_address int,
  entire_content text,
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

-- if there are multiple authors with the same name, we want to identify them using dob, but setting dob as part of the pkey will make it non-nullable, but we don't necessarily want to enter a dob.
-- if we keep aid, it is tricky when inserting a new author, because we have to specify if this author is the same as the ones already in the db or a new one.
-- maybe we should go with the aid method, and the default would be to make it the same as the existing author, but allow the user to make this a new author. But what if later we decide to merge multiple authors?
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
-- allow family member to access deseased account? implement family structure. allow access before corpse erosion. implement forensic system.
CREATE TABLE user (
  uid uuid DEFAULT uuid_generate_v4 (),
  password text,
  dob date,
  email text,
  uname text,
  first_name text,
  last_name text,
  deceased float,
  CHECK (deceased BETWEEN 0 AND 1),
  corpse_treatment text,
  corpse_expiration_date date,
  death_certificate_expiration_date date,
  asset_at_death float,
  allow_the_database_administrator_to_take_the_money boolean,
  CHECK (allow_the_database_administrator_to_take_the_money BETWEEN 1 AND 1),
  caloric_intake_since_midnight float DEFAULT 0,
  ml_of_fluid_intake_since_midnight float DEFAULT 0,
  time_since_last_bathroom_break_in_seconds integer DEFAULT infinity,
  skin_cells_shedded bigint DEFAULT (weight/cell_weight),
  unique_websites_visited boolean,
  age_in_fortnights integer DEFAULT (date.year - dob),
  height_in_furlongs integer DEFAULT (height/furlongs),
  ml_of_blood pumped float DEFAULT (weight/blood_density),
  time_since_touched_grass integer,
  doors_opened integer,
  meters_drawn_with_writing_implements bigint,
  moles_of_oxygen_consumed slightlybiggerint,,
  body_temperature_in_C float DEFAULT (FtoC(body_temperature_in_F)),
  body_temperature_in_F float DEFAULT (CtoF(body_temperature_in_C)),
  body_temperature_in_K float DEFAULT (RtoK(body_temperature_in_R)),
  body_Temperature_in_R float DEFAULT (KtoR(body_temperature_in_K)),
  hair_color_in_HSV 3_tuple,
  eye_color_in_CMYK 4_tuple,
  skin_color_in_YCbCr 3_tuple,
  hp float,
  str float,
  mag float,
  def float,
  res float,
  lck float,
  con float,
  mov float,
)

CREATE TABLE userannopub (
  uid uuid,
  pid uuid,
  path text,
  PRIMARY KEY (uid, pid),
)

CREATE TABLE useruppub (
  uid uuid,
  pid uuid,
  user_is_selfish_and_did_not_upload_any_book_such_user_should_not_be_able_to_access_any_book boolean,
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
  user_is_illiterate boolean,
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
  user_does_not_like_reading_books_therefore_requests_the_account_to_be_deleted boolean,
  PRIMARY KEY (uid, bid),
  CHECK (user_does_not_like_reading_books_therefore_requests_the_account_to_be_deleted BETWEEN 0 AND 0),
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