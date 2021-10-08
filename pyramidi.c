#include <stdio.h>

/*
         a
        aa
       aaa
      aaaa
     aaaaa
    aaaaaa
   aaaaaaa
  aaaaaaaa
 aaaaaaaaa
 
 pseudokoodi:
 1. Aloita uusi rivi
 2. Tulosta riville tyhjät merkit
 	Tyhjiä rivejä tulostetaan seuraava määrä: Taulukon koko - nykyinen rivi
 3. Tulosta riville a -merkit
 	A-merkkejä tulostetaan seuraava määrä: Taulukon koko - tyhjien merkkien määrä
 4. takaisin kohtaan #1, kunnes kaikki on tulostettu
 
*/

#include <time.h>

void delay(int number_of_seconds)
{
    // Converting time into milli_seconds
    int milli_seconds = 1000 * number_of_seconds;
  
    // Storing start time
    clock_t start_time = clock();
  
    // looping till required time is not achieved
    while (clock() < start_time + milli_seconds)
        ;
}
  

int main(void) {

	int nykyinenMerkkiosoitin = 0;
	int koko = 10;
	
	// Hoidetaan pyramdin tulostus rivi kerrallaan
	for(int rivit = 1; rivit < koko+1; rivit++)
	{
		nykyinenMerkkiosoitin = 0;
		
		// Hoidetaan yhden rivin tyhjät merkit tässä
		for(int tyhjat = 0; tyhjat < koko-rivit; tyhjat++)
		{
			printf("x");
			nykyinenMerkkiosoitin++;
		}
		delay(50);
		
		// Hoidetaan yhden rivin a-merkit tässä
		for(int kirjainA = 0; kirjainA < koko-nykyinenMerkkiosoitin; kirjainA++)
		{
			printf("a");
		}
		delay(50);
		
		// Rivi valmis, tehdään vielä rivinvaihto
		printf("\n");
		
	}

	return 0;
}
