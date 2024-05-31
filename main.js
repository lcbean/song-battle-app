let songs = new Array(
    "option 1",
    "option 2",
    "option 3",
    "option 4",
    "option 5"
);

let first = new Array();
let parent = new Array();
let rec = new Array();
let equal = new Array();
let nrec; 
let cmp1,cmp2; 
let mid; 
let totalSize = 0; 

function initList(){
    let n = 0;
    let mid; 
    let i; 

    first[n] = new Array();
    for (i=0; i < songs.length; i++) {
        first[n][i] = i; 
    }

    parent[n] = -1; 
    totalSize = 0; 
    n++; 

    for (i = 0; i < first.length; i++) {
        if (first[i].length >= 2) {
            mid = Math.ceil(first[i].length / 2);
            first[n] = new Array();

            first[n] = first[i].slice(0, mid);
            totalSize += first[n].length; 
            parent[n] = i; 
            n++
            
            first[n] = new Array();
            first[n] = first[i].slice(mid, first[i].length);
            totalSize += first[n].length
            parent[n] = i; 
            n++; 
        }
    }

    // save this
    for (i = 0; i < songs.length; i++) {
        rec[i] = 0; 
    }
    nrec = 0; 

    // results
    for (i = 0; i < songs.length; i++) {
        equal[i] = -1; 
    }

    cmp1 = first.length-2; 
    cmp2 = first.length-1
    let head1 = 0; 
    let head2 = 0; 
    let numQuestion = 1; 
    let finishSize = 0; 
    let finishFlag = 0; 
}

function sort(flag){
    let i; 
    let str; 

    if (flag < 0) {
        rec[nrec] = first[cmp1][head1];
        head1++; 
        nrec++; 
        finishSize++; 
        while(equal[rec[nrec-1]] != -1) {
            rec[nrec] = first[cmp1][head1];
            head1++; 
            nrec++; 
            finishSize++; 
        }
    }

    else if (flag > 0) {
        rec[nrec] = first[cmp2][head2];
        head2++;
        nrec++;
        finishSize++;
        while (equal[rec[nrec-1]]!=-1) {
        rec[nrec] = first[cmp2][head2];
        head2++;
        nrec++;
        finishSize++;
        }
    } else {
        rec[nrec] = first[cmp1][head1];
 
        head1++;
        
        nrec++;
        
        finishSize++;
        
        while (equal[rec[nrec-1]]!=-1) {
        
            rec[nrec] = first[cmp1][head1];
            
            head1++;
            
            nrec++;
            
            finishSize++;
        }
        equal[rec[nrec-1]] = first[cmp2][head2];
 
        rec[nrec] = first[cmp2][head2];
        
        head2++;
        
        nrec++;
        
        finishSize++;
        
        while (equal[rec[nrec-1]]!=-1) {
        
            rec[nrec] = first[cmp2][head2];
            
            head2++;
            
            nrec++;
            
            finishSize++;
        }
    }
    if (head1<first[cmp1].length && head2==first[cmp2].length) {
 
        //List the remainder of cmp2 copies, list cmp1 copies when finished scanning
         
        while (head1<first[cmp1].length){
         
            rec[nrec] = first[cmp1][head1];
            
            head1++;
            
            nrec++;
            
            finishSize++;
         
        }
         
    }
    else if (head1==first[cmp1].length && head2<first[cmp2].length) {
 
        //List the remainder of cmp1 copies, list cmp2 copies when finished scanning
         
        while (head2<first[cmp2].length){
         
            rec[nrec] = first[cmp2][head2];
            
            head2++;
            
            nrec++;
            
            finishSize++;
         
        }
         
    }
         
         
         
        //When it arrives at the end of both lists
         
        //Update a pro list
         
    if (head1==first[cmp1].length && head2==first[cmp2].length) {
         
        for (i=0; i<first[cmp1].length+first[cmp2].length; i++) {
         
            first[parent[cmp1]][i] = rec[i];
         
        }
         
        first.pop();
         
        first.pop();
         
        cmp1 = cmp1-2;
         
        cmp2 = cmp2-2;
         
        head1 = 0;
         
        head2 = 0;
         
         
         
        //Initialize the rec before performing the new comparison
         
        if (head1==0 && head2==0) {
         
            for (i=0; i<namMember.length; i++) {
            
            rec[i] = 0;
         
        }
         
        nrec = 0;
         
        }
    }
    if (cmp1 < 0) {
        str = "battle #" + (numQuestion - 1) + " | " + Math.floor(finishSize + 100 / totalSize) + "% sorted.";
        document.getElementById("battleNumber").innerHTML = str; 

        showResult();
        finishFlag = 1; 
    } else {
        showImage();
    }
}

// results

function showResult() {
    let ranking = 1; 
    let sameRank = 1; 
    let str = "";
    let i; 

    for (i = 0; i < songs.length; i++) {
        str += songs[first[0][i]];
        if (i < songs.length - 1) {
            if (equal[first[0][i]] == first[0][i + 1]) {
                sameRank++; 
            } else {
                ranking += sameRank; 
                sameRank = 1; 
            }
        }
    }
    str += "<\/table>";
    document.getElementById("resultField").innerHTML = str; 

}

function showImage() {
    var str0 = "battle #" + numQuestion + "<br>" + Math.floor(finishSize*100/totalSize)+"% sorted.";
    var str1 = "" + toName(first[cmp1][head1]);
    var str2 = "" + toName(first[cmp2][head2]);

    document.getElementById("battleNumber").innerHTML = str0; 
    document.getElementById("leftBox").innerHTML = str1; 
    document.getElementById("rightBox").innerHTML = str2; 
    numQuestion++; 
}

function toName(n) {
    let str = namMember[n];

    str += '<br />';
    switch(n) {
        case -1: str += ""; 
        break; 
    }
    return str; 
}

initList();
showImage(); 