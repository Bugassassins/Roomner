#include <algorithm>
#include <iostream>
#include <sstream>
#include <iomanip>
#include <vector>
#include <string>
#include <cmath>
#include <utility>
#include <time.h>
#include <cstdlib>
#include <map>
#define ll long long int
using std::vector;
using std::string;
using std::pair;
using std::min;
using namespace std;
map<int,int>m_weight;
struct Ques{
    int q1;
    int q2;
    int q3;
};
double matching_algo(vector<Ques> &subject1,vector<Ques> &subject2){
    long long int p_res=0;
    long long int q_res=0;
    long long int totp=0;
    long long int totq=0;
    double res;
    // vector<int>v25;
    // vector<int>v50;
    // vector<int>v75;
    for(int i=0;i<15;i++){
        p_res+=abs(abs(subject1[i].q2-subject2[i].q1)-2)*subject1[i].q3;
        q_res+=abs(abs(subject1[i].q1-subject2[i].q2)-2)*subject2[i].q3;
        totp+=2*subject1[i].q3;
        totq+=2*subject2[i].q3;
    }
    double percent_p=(double)p_res/(double)totp;
    double percent_q=(double)q_res/(double)totq;
    res=sqrt(percent_p*percent_q);
    // res=(percent_p+percent_q)/2;
    return res;
}
int main() {
    srand((unsigned) time(0));
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
    m_weight[0]=1;
    m_weight[1]=100;
    m_weight[2]=10000;
    int test=0;
    vector<Ques>v1;
    for(int i=0;i<15;i++){
            int rq1=(rand()%3);
            int rq2=(rand()%3);
            int rq3=(rand()%3);
            Ques q;
            q.q1=rq1;
            q.q2=rq2;
            q.q3=m_weight[rq3];
            v1.push_back(q);
    }
    while(test<1000){
        vector<Ques>v2;
        for(int i=0;i<15;i++){
            int rq1=(rand()%3);
            int rq2=(rand()%3);
            int rq3=(rand()%3);
            Ques q;
            q.q1=rq1;
            q.q2=rq2;
            q.q3=m_weight[rq3];
            v2.push_back(q);
        }
        // for(auto&it:v1){
        //     std::cout<<it.q1<<","<<it.q2<<","<<it.q3<<"\n";
        // }
        // for(auto&it:v2){
        //     std::cout<<it.q1<<","<<it.q2<<","<<it.q3<<"\n";
        // }
        std::cout<<"The Score was "<<floor(matching_algo(v1,v2)*100)<<"\n";
        std::cout<<"-----TEST "<<test+1<<" END------\n";
        test++;
    }
}
