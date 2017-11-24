function getCurvePoints(pts, tension, isClosed, numOfSegments) {

    // use input value if provided, or use a default value   
    tension = (typeof tension != 'undefined') ? tension : 0.5;
    isClosed = isClosed ? isClosed : false;
    numOfSegments = numOfSegments ? numOfSegments : 16;

    var _pts = [], res = [],    // clone array
        x, y,           // our x,y coords
        t1x, t2x, t1y, t2y, // tension vectors
        c1, c2, c3, c4,     // cardinal points
        st, t, i;       // steps based on num. of segments

    // clone array so we don't change the original
    //
    _pts = pts.slice(0);
    // The algorithm require a previous and next point to the actual point array.
    // Check if we will draw closed or open curve.
    // If closed, copy end points to beginning and first points to end
    // If open, duplicate first points to befinning, end points to end
    if (isClosed) {
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.unshift(pts[pts.length - 1]);
        _pts.unshift(pts[pts.length - 2]);
        _pts.push(pts[0]);
        _pts.push(pts[1]);
    }
    else {
        _pts.unshift(pts[1]);   //copy 1. point and insert at beginning
        _pts.unshift(pts[0]);
        _pts.push(pts[pts.length - 2]); //copy last point and append
        _pts.push(pts[pts.length - 1]);
    }
     // ok, lets start..

    // 1. loop goes through point array
    // 2. loop goes through each segment between the 2 pts + 1e point before and after
    for (i=2; i < (_pts.length - 4); i+=2) {
        for (t=0; t <= numOfSegments; t++) {

            // calc tension vectors
            t1x = (_pts[i+2] - _pts[i-2]) * tension;
            t2x = (_pts[i+4] - _pts[i]) * tension;

            t1y = (_pts[i+3] - _pts[i-1]) * tension;
            t2y = (_pts[i+5] - _pts[i+1]) * tension;

            // calc step
            st = t / numOfSegments;

            // calc cardinals
            c1 =   2 * Math.pow(st, 3)  - 3 * Math.pow(st, 2) + 1; 
            c2 = -(2 * Math.pow(st, 3)) + 3 * Math.pow(st, 2); 
            c3 =       Math.pow(st, 3)  - 2 * Math.pow(st, 2) + st; 
            c4 =       Math.pow(st, 3)  -     Math.pow(st, 2);

            // calc x and y cords with common control vectors
            x = c1 * _pts[i]    + c2 * _pts[i+2] + c3 * t1x + c4 * t2x;
            y = c1 * _pts[i+1]  + c2 * _pts[i+3] + c3 * t1y + c4 * t2y;

            //store points in array
            res.push(x);
            res.push(y);
            
        }
    }

    return res;
}

function drawLines(ctx, pts) {
    ctx.moveTo(pts[0], pts[1]);
    for(var i=2;i<pts.length-1;i+=2) ctx.lineTo(pts[i], pts[i+1]);
}

function drawCurve(ctx, ptsa, tension, isClosed, numOfSegments, showPoints) {

    showPoints  = showPoints ? showPoints : true;

    ctx.beginPath();

    drawLines(ctx, getCurvePoints(ptsa, tension, isClosed, numOfSegments));

    if (showPoints) {
        ctx.stroke();
        ctx.beginPath();
        for(var i=0;i<ptsa.length-1;i+=2) 
                ctx.rect(ptsa[i] - 2, ptsa[i+1] - 2, 4, 4);
    }
}


function drawShape() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    
    var emotions = ['','Anger', 'Hope', 'Disgust', 'Fear', 'Joy', 'Sad', 'Surprise', 'Trust', ''];
    var x = 150;
    var ivl = 20
    
    for (var i = 1, cs = 20; i < 10; i++, cs = cs + 20) {
        ctx.beginPath();
        ctx.moveTo(x, 20);
        ctx.lineTo(x, 300);
        
        for (var t = 0, ivl = 20 ; t < 11; t=t+2, ivl=ivl+52){
            ctx.moveTo(x-2, ivl);
            ctx.lineTo(x+2, ivl);
            ctx.stroke();
            
            if (i==9) ctx.strokeText(''+t+'%',x+10,ivl);
        }
        ctx.strokeStyle='rgb('+ (255-x) + ','+ x + ',' + 
                         cs + ')';
        ctx.strokeText(emotions[i],x-10,10);
        ctx.stroke();
        
        x = x + 50; 
        ctx.closePath();
      
    }
    
    for (var t = 0, ivl = 20 ; t < 10; t=t+2, ivl=ivl+52){
        ctx.beginPath();
        ctx.moveTo(x-1, ivl);
        ctx.lineTo(x-1, 3);
        ctx.strokeStyle='rgb(255,255,255)';
        ctx.stroke();
        ctx.strokeText(''+i,x+10,ivl);
        ctx.closePath();
    }
    
    //drawCurve(ctx, myPoints, tension);
    
    ctx.strokeStyle='#AD0';
    ctx.strokeText("Secret Garden",10,20);
    var book0 = [100,20, 150,77, 200,150, 250,81, 300,82, 350,156, 400,100, 450,87, 500,148]; //minimum two points
    //var tension = 1;
    drawCurve(ctx, book0); //default tension=0.5
    
    
    ctx.strokeStyle='#000';
    ctx.strokeText("1984",10,40);
    var book1 = [100,40, 150,114, 200,142, 250,94, 300,153, 350,110, 400,129, 450,78, 500,169]; //minimum two points
    drawCurve(ctx, book1); //default tension=0.5
    
    ctx.strokeStyle='#DF0';
    ctx.strokeText("Adventures of Huckleberry",10,60);
    var book2 = [100,60, 150,87, 200,158, 250,70, 300,114, 350,114, 400,93, 450,101, 500,173]; //minimum two points
    drawCurve(ctx, book2); //default tension=0.5

    
    ctx.strokeStyle='#09F';
    ctx.strokeText("Tale of Two Cities",10,80);
    var book3 = [100,80, 150,107, 200,149, 250,80, 300,137, 350,120, 400,124, 450,84, 500,185]; //minimum two points
    drawCurve(ctx, book3); //default tension=0.5
    						
    ctx.strokeStyle='#CD0';
    ctx.strokeText("Wuthering Heights",10,100);
    var book4 = [100,100, 150,130, 200,153, 250,104, 300,158, 350,135, 400,150, 450,90, 500,173]; //minimum two points
    drawCurve(ctx, book4); //default tension=0.5
    
    
    ctx.strokeStyle='#6CF';
    ctx.strokeText("Brave New World",10,120);
    var book5 = [100,120, 150,126, 200,143, 250,95, 300,143, 350,135, 400,121, 450,95, 500,152]; //minimum two points
    drawCurve(ctx, book5); //default tension=0.5
    
    ctx.strokeStyle='#FC0';
    ctx.strokeText("Sense and Sensibility",10,140);
    var book6 = [100,140, 150,61, 200,133, 250,56, 300,76, 350,122, 400,84, 450,68, 500,149]; //minimum two points
    drawCurve(ctx, book6); //default tension=0.5
    
    ctx.strokeStyle='#AA8';
    ctx.strokeText("Animal Farm",10,160);
    var book7 = [100,160, 150,98, 200,143, 250,74, 300,118, 350,93, 400,89, 450,70, 500,127]; //minimum two points
    drawCurve(ctx, book7); //default tension=0.5

    ctx.strokeStyle='#09A';
    ctx.strokeText("Odyssey",10,180);
    var book8 = [100,180, 150,92, 200,145, 250,68, 300,116, 350,115, 400,105, 450,72, 500,149]; //minimum two points
    drawCurve(ctx, book8); //default tension=0.5

    
    ctx.strokeStyle='#000';
    ctx.strokeText("Hamlet",10,200);
    var book9 = [100,200, 150,126, 200,187, 250,151, 300,172, 350,176, 400,146, 450,125, 500,284]; //minimum two points
    drawCurve(ctx, book9); //default tension=0.5
    
    ctx.strokeStyle='#F00';
    ctx.strokeText("Romeo and Juliet",10,220);
    var book10 = [100,220, 150,154, 210,120, 250,130, 300,190, 350,218, 400,191, 450,130, 500,262]; //minimum two points
    drawCurve(ctx, book10); //default tension=0.5
    
    
    ctx.strokeStyle='#ABC';
    ctx.strokeText("Diary of Young Girl",10,240);
    var book12 = [100,240, 150,90, 200,194, 250,76, 300,100, 350,167, 400,142, 450,90, 500,225]; //minimum two points
    drawCurve(ctx, book12); //default tension=0.5
    						
    ctx.strokeStyle='#CGE';
    ctx.strokeText("The Picture of Dorian Gray",10,260);
    var book13 = [100,260, 150,120, 200,155, 250,132, 300,143, 350,162, 400,171, 450,99, 500,176]; //minimum two points
    drawCurve(ctx, book13); //default tension=0.5
    
    
    ctx.strokeStyle='#B9F';
    ctx.strokeText("Little Women",10,280);
    var book14 = [100,280, 150,86, 200,194, 250,76, 300,101, 350,204, 400,123, 450,110, 500,205]; //minimum two points
    drawCurve(ctx, book14); //default tension=0.5
    
}
