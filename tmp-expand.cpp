//
//  main.cpp
//  theTruth
//
//  Created by 马嘉诚 on 11/7/15.
//  Copyright © 2015 马嘉诚. All rights reserved.
//

#include <iostream>
#include <ctime>
#include <cstdlib>
#include <iomanip>
using namespace std;

int main(int argc, const char * argv[]) {
    srand(clock());
    int map[20][20];
    int flag[20][20];
    for (int i=0; i<20; i++) {
        for (int j=0; j<20; j++) {
            map[i][j]=0;
            flag[i][j]=0;
        }
    }
    int x,y;
    cout << "input x & y : ";
    cin >> x >> y;
    map[x][y]=1;
    while(true){
        for (int i=0; i<20; i++) {
            for (int j=0; j<20; j++) {
                if (map[i][j]==0) {
                    continue;
                }
                if (rand()%2) {
                    if (i!=0 && map[i][j]>=map[i-1][j]) {flag[i-1][j]++;}
                    else if (map[i][j]>=map[i-1][j]) {flag[i-1+20][j]++;}
                }
                if (rand()%2) {
                    if (i!=49 && map[i][j]>=flag[i+1][j]) {flag[i+1][j]++;}
                    else if (map[i][j]>=flag[i+1][j]) {flag[i+1-20][j]++;}
                }
                if (rand()%2) {
                    if (j!=0 && map[i][j]>=map[i][j-1]) {flag[i][j-1]++;}
                }
                if (rand()%2) {
                    if (j!=49 && map[i][j]>=map[i][j+1]) {flag[i][j+1]++;}
                }
            }
        }
        for (int i=0; i<20; i++) {
            for (int j=0; j<20; j++) {
                map[i][j]+=flag[i][j];
            }
        }
        for (int i=0; i<20; i++) {
            for (int j=0; j<20; j++) {
                if (map[j][i]!=0) cout << setw(2)<< map[j][i] << " ";
                else cout << "   ";
                flag[j][i]=0;
            }
            cout << endl;
        }
        getchar();
    }
    
}
