struct grid {
    creature clist[200];
    int envlv[20];
    int cnumber;
    
    double distance(int n) {
        double sum=0;
        for(int i=0;i<20;i++) {
            sum+=(envlv[i]-clist[n].gene[i])*(envlv[i]-clist[n].gene[i]);
        }
        sum=sqrt(sum);
        return sum;
    }
    
    void change(){
        for(int i=0;i<cnumber;i++) {
            for(int j=0;j<20;j++) {
                if (rand()%2) clist[i].gene[j]+=(rand()%3-1);
            }
        }
    }
    void weedout() {
        if (cnumber<=10+rand()%10)//maybe
            return;
        int minc=0;
        double mindis=distance(0);
        for (int i=1;i<cnumber;i++) {
            double tmpdis=distance(i);
            if (tmpdis>mindis) {
                minc=i;
                mindis=tmpdis;
            }
        }
        if (minc!=cnumber-1) {
            cnumber--;
        }
        else {
            clist[minc]=clist[cnumber-1];
            cnumber--;
        }
    }
};
