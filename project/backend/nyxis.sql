\echo 'Delete and recreate nyxis db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE nyxis;
CREATE DATABASE nyxis;
\connect nyxis

\i nyxis-schema.sql
\i nyxis-seed.sql

\echo 'Delete and recreate nyxis_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE nyxis_test;
CREATE DATABASE nyxis_test;
\connect nyxis_test

\i nyxis-schema.sql