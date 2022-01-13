import Head from 'next/head';
import Image from 'next/image';
import { nestedGroupsBy } from '../helpers/helpers';
import { getRecords } from '../lib/airtable-api';
import mockData from '../data/mockData.json';
import styles from '../styles/Home.module.scss';
import { Fragment } from 'react';

export default function Home({ data }) {
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
          {Object.keys(data).map((mainCategory, index) => (
            <Fragment key={`${mainCategory}${index}`}>
              {Object.keys(data[mainCategory]).map((secCategory) => (
                <section
                  key={secCategory}
                  className={`${styles.card} ${
                    styles[`card-lighter-${index}`]
                  }`}
                  data-category={mainCategory}
                >
                  <div className={`${styles[`card-base-${index}`]}`}>
                    <h2 className={styles.card__heading}>{secCategory}</h2>
                  </div>
                  <ol className={styles.list}>
                    {data[mainCategory][secCategory].map((item, i) => (
                      <li key={item.name + i}>
                        <a
                          href={item.url}
                          data-goatcounter-click="outlink"
                          data-goatcounter-title={item.url}
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              ))}
            </Fragment>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const records = await getRecords();
  //const records = mockData.apiResponse;
  const formattedRecords = nestedGroupsBy(records, ['category', 'secCategory']);
  return {
    props: {
      data: formattedRecords,
    },
  };
}
