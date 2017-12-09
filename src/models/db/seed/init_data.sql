\COPY books (title, author, genre, height, publisher) FROM './src/models/db/seed/books.csv' DELIMITER ',' CSV HEADER;
