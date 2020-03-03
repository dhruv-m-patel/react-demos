export default async function AboutPage(router) {
  router.get('/', async (req, res, next) => {
    next();
  });
}
