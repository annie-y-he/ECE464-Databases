## Log

- next.js fast refresh does not work in container. Needs to update polling for files. Or develop locally and contain only the built files.
- bcrypt needs to be reinstalled in docker (changed to bcryptjs)
- export as GET as POST.
- docker-compose is separate
- change db url for local
- persist data
- basepath to next.config.mjs, .env bp add to api and asset
- added upload function

## Todo

#### backend
- **library**: recommends books to users based on their follows and uploads
- **profile**: retrieves and allows editing of user profile, if role is not admin only retrieves self, if admin, can specify uid or email
- **search**: retrieves search results from multiple tables according to input string
- **follow**: implement retrieve, create, delete user follows
- **manage**: modify to adapt to retrieve, update, delete, and upload
  - fetch existing relations if applicable, compare at the end then delete unused.
  - retrieve if is GET, update/upload if POST, delete if DELETE

#### frontend
- **reading**: actual reading page
- **metadata**: book info, publication info, author info, etc.

#### database
- **persistence**: setup persistent volume

## Errors
- **uid**: each seed generates different uuid which differs from the cookies. compare sub or make persistent.
## DevEnv
in databases folder:
- ./docker.sh
- ./docker.sh app
  - npm install
  - npx prisma generate
  - npx prisma migrate deploy
  - npx prisma db seed
  - exit
in next folder:
- npm run dev