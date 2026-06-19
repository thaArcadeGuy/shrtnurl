## Known Limitations

**Authentication uses Clerk development keys in production.**
Clerk requires a custom domain (DNS records) to issue production API keys —
`*.vercel.app` domains aren't supported for production Clerk instances.
Since this project is deployed on a free Vercel subdomain, it currently runs
on Clerk's development instance, which has standard rate limits but is
otherwise fully functional.

**To resolve:** purchase a custom domain, point it at the Vercel deployment,
then create a Clerk production instance against that domain and swap in the
`pk_live_...` key.