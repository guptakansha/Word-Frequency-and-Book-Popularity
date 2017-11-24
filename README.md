# Word-Frequency-and-Book-Popularity
Advanced Authentic Research project for Gunn High School 2017. Correlation between independently occurring words and popularity of books.

## Research Methodology
Basic textmining including loading/cleaning text data downloaded from Project Gutenberg, MIT-Stanford Literature project and other websites, and creating relational tables for parsed words. Using data stores on the web such as 'NRC emotions' data, and 'Category Variation' data for tagging the words (classification by emotion Words, and word variations) from a set of popular fiction books on different topics. 

### Analytics and Charts 
https://sites.google.com/view/aar-akanshagupta/home

## Java Code
ConnectURL.java: Looks up each of the word from the list compiled for checking against the URL link for word variations
ConnectDB.java: Words look up in the database
WordsDB.java: Driver program to update words in the db to root word
NewFrequency.java: Driver program to Update the  data by changing the word variations to 0 and sums up the occurrence of all the word variations.
### Output:
imaginary: Iterating over HashSet from CATVAR: [imagined, imagery, imagine, imaginativeness, imaginatively, imaginable, imagism, image, imaginary, imagination, imaging, imaginative]
Iterating over HashSet from DB: [imaginary, imagine]
imaginaryConnecting to database...
Creating prepared statement...
imaginary updated.imagine updated.Goodbye!
