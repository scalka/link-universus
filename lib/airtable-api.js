import * as Airtable from 'airtable';

Airtable.configure({
  endpointUrl: process.env.AIRTABLE_ENDPOINT,
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

// Reference a table
const table = base('Home');

export function getRecords() {
  const totalRecords = [];

  return new Promise((resolve, reject) => {
    table
      .select({
        sort: [{ field: 'name', direction: 'asc' }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          console.log(records);
          records.forEach((record) => {
            const id = record.getId();
            const name = record.get('name');
            const url = record.get('url');
            const category = record.get('category') || '';
            const secCategory = record.get('secondary_category') || category;

            totalRecords.push({
              id,
              name,
              url,
              category,
              secCategory,
            });
          });

          fetchNextPage();
        },
        function done(err) {
          if (err) return reject(err);
          return resolve(totalRecords);
        }
      );
  });
}
