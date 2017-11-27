\COPY books (title, author, genre, height, publisher) FROM './src/models/db/seed/books.csv' DELIMITER ',' CSV HEADER;

-- can I add more functions here to alter the table and remove unnecessary columns? Is it ok to do so, or it's better just to upload needed comumns only?
