import * as Airtable from 'airtable';

Airtable.configure({
  endpointUrl: AIRTABLE_ENDPOINT,
  apiKey: AIRTABLE_API_KEY,
});

const base = Airtable.base(AIRTABLE_BASE_ID);

// Reference a table
const table = base('Home');

export function getRecords() {
  const totalRecords = [];

  return new Promise((resolve, reject) => {
    table.select().eachPage(
      function page(records, fetchNextPage) {
        records.forEach((record) => {
          const id = record.getId();
          const name = record.get('Name');
          const url = record.get('URL');
          const category = record.get('Category') || '';
          const relation = record.get('Related to') || '';

          totalRecords.push({
            id,
            name,
            url,
            category,
            relation,
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
