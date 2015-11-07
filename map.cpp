int main() {
    srand(clock());
    int grid[100][100];
    int m=10,n=10;
//    cin >> m >> n;
    grid[0][0]=0;
    for (int i=1; i<m; i++) {
        if (rand()%4-1>0) grid[i][0]=grid[i-1][0]+rand()%4-1;
        else grid[i][0]=rand()%21-10;
    }
    grid[0][m-1]=0;
    for (int i=1; i<m; i++) {
        if (rand()%4-1>0)grid[i][m-1]=grid[i-1][0]+rand()%4-1;
        else grid[i][m-1]=rand()%21-10;
    }
    for (int j=1; j<n-1; j++) {
        if (rand()%4-1>0)grid[0][j]=grid[0][j-1]+rand()%4-1;
        else grid[0][j]=rand()%21-10;
    }
    for (int j=1; j<n-1; j++) {
        if (rand()%4-1>0)grid[n-1][j]=grid[n-1][j-1]+rand()%4-1;
        else grid[n-1][j]=rand()%21-10;
    }
    
    int i=1,j=m-2;
    int k=1,l=n-2;
    while (i<j || k<l) {
        for (int p=i; p<=j; p++) {
            if (rand()%4-1>0)grid[p][i]=grid[p][i-1]+rand()%4-1;
            else grid[p][i]=rand()%21-10;
        }
        for (int p=i; p<=j; p++) {
            if (rand()%4-1>0)grid[p][j]=grid[p][j+1]+rand()%4-1;
            else grid[p][j]=rand()%21-10;
        }
        for (int p=k; p<=l; p++) {
            if (rand()%4-1>0)grid[k][p]=grid[k-1][p]+rand()%4-1;
            else grid[k][p]=rand()%21-10;
        }
        for (int p=k; p<=l; p++) {
            if (rand()%4-1>0)grid[l][p]=grid[l+1][p]+rand()%4-1;
            else grid[l][p]=rand()%21-10;
        }
        if (i<j) {
            i++;
            j--;
        }
        if (k<l) {
            k++;
            l--;
        }
    }
    
    for (int i=0; i<m; i++) {
        for (int j=0; j<n; j++) {
            cout <<setw(3)<< grid[i][j] << " ";
//            else cout << "    ";
        }
        cout << endl << endl;
    }
    
    cout << endl;
}
