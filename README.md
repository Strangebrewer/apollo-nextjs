# apollo-nextjs

## Setup

You'll need to do a few things to get this working:
- create a `.env` file in the `next` folder.
  - The only values you'll need initially are for Cloudinary (see below)
- create a `.env.local` file in the `next` folder
  - Again, the only values you'll need here are for Cloudinary

- create a `.env` file in the `api` folder
  - You'll need to enter values here for a JWT secret and your MongoDB setup. The app is setup to use MongoDB Atlas, so if you have an account there, just enter those values. But, it can easily be reconfigured to use a local mongo instance. Just go to `api > src > db > index.ts` to make the relevant changes.
  - The `APOLLO` values in the `.env` aren't critical unless you want to be able to use the web-based apollo graphql playground. The service name is up to you, but the service-key comes from apollo once you've setup at [apollo studio](https://studio.apollographql.com)

- create a [Cloudinary](https://cloudinary.com/) account. The free tier is more than enough and it's really easy to get going. Once you have an account, just enter the name, key, and secret into the .env

You'll need to `npm i` in both the `api` and `next` folders.

You should probably seed the database since I haven't created a way to register an account yet. Security is very basic, but functional. You can always change the data in the seed files to whatever you want. The command is `npm run seed`.

To start the apps, each piece runs separately. The `api` start command is simply `npm start`. The `next` command is `npm run dev`.


## Annnnnnnd...
I have no claim to code quality here - very little is complete. This is more of an extensive playground rather than an actual project. If you follow all of the above steps and it still won't work, sprinkle some pixie dust, take a nap, have a snack, and try again until your fingers are bloody and your eyes glaze over with disgust and resignation. Or just ask me.