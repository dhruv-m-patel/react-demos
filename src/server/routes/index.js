export default async function HomePage(router) {
  router.get('/', async (req, res, next) => {
    next();
  });
}
