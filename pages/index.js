import Head from 'next/head';
import Image from 'next/image';
import { groupBy } from '../helpers/helpers';
import { getRecords } from '../lib/airtable-api';
import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  console.log(data);
  return (
    <div className={styles.container}>
      <Head>
        <title>The Digital Directory</title>
        <meta name="description" content="The Digital Directory" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to The Digital Directory</h1>
        <div className={styles.container}>
          {Object.keys(data).map((key) => (
            <section key={key} className={styles.card}>
              <div className={styles.card__head}>
                <h2 className={styles.card__heading}>{key}</h2>
              </div>
              <ol className={`${styles.card__body} ${styles.list}`}>
                {data[key].map((item) => (
                  <li key={item.name}>
                    <a href={item.url}>{item.name}</a>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const records = await getRecords();
  const formattedRecords = groupBy(records, 'secCategory');
  return {
    props: {
      data: formattedRecords,
    },
  };
}
