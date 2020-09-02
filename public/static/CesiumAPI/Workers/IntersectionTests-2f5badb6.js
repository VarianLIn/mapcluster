define(["exports","./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-bddc1162","./Transforms-f7baeaa6"],function(a,q,t,T,U,W){"use strict";var B={};function C(a,t,e){var r=a+t;return T.CesiumMath.sign(a)!==T.CesiumMath.sign(t)&&Math.abs(r/Math.max(Math.abs(a),Math.abs(t)))<e?0:r}B.computeDiscriminant=function(a,t,e){return t*t-4*a*e},B.computeRealRoots=function(a,t,e){var r;if(0===a)return 0===t?[]:[-e/t];if(0===t){if(0===e)return[0,0];var n=Math.abs(e),i=Math.abs(a);if(n<i&&n/i<T.CesiumMath.EPSILON14)return[0,0];if(i<n&&i/n<T.CesiumMath.EPSILON14)return[];if((r=-e/a)<0)return[];var s=Math.sqrt(r);return[-s,s]}if(0===e)return(r=-t/a)<0?[r,0]:[0,r];var o=C(t*t,-(4*a*e),T.CesiumMath.EPSILON14);if(o<0)return[];var u=-.5*C(t,T.CesiumMath.sign(t)*Math.sqrt(o),T.CesiumMath.EPSILON14);return 0<t?[u/a,e/u]:[e/u,u/a]};var N={};function o(a,t,e,r){var n=a,i=t/3,s=e/3,o=r,u=n*s,C=i*o,c=i*i,l=s*s,h=n*s-c,M=n*o-i*s,f=i*o-l,m=4*h*f-M*M;if(m<0){var d,g,v,p=u*l<=c*C?-2*i*(g=h)+(d=n)*M:-(d=o)*M+2*s*(g=f),w=-(p<0?-1:1)*Math.abs(d)*Math.sqrt(-m),R=(v=w-p)/2,S=R<0?-Math.pow(-R,1/3):Math.pow(R,1/3),O=v===w?-S:-g/S,x=g<=0?S+O:-p/(S*S+O*O+g);return u*l<=c*C?[(x-i)/n]:[-o/(x+s)]}var y=h,P=-2*i*h+n*M,b=f,N=-o*M+2*s*f,q=Math.sqrt(m),L=Math.sqrt(3)/2,I=Math.abs(Math.atan2(n*q,-P)/3);x=2*Math.sqrt(-y);var E=Math.cos(I);v=x*E;var z=x*(-E/2-L*Math.sin(I)),T=2*i<v+z?v-i:z-i,U=n,W=T/U,I=Math.abs(Math.atan2(o*q,-N)/3),B=-o,V=(v=(x=2*Math.sqrt(-b))*(E=Math.cos(I)))+(z=x*(-E/2-L*Math.sin(I)))<2*s?v+s:z+s,Z=B/V,A=-T*V-U*B,D=(s*A-i*(T*B))/(-i*A+s*(U*V));return W<=D?W<=Z?D<=Z?[W,D,Z]:[W,Z,D]:[Z,W,D]:W<=Z?[D,W,Z]:D<=Z?[D,Z,W]:[Z,D,W]}N.computeDiscriminant=function(a,t,e,r){var n=t*t,i=e*e;return 18*a*t*e*r+n*i-27*(a*a)*(r*r)-4*(a*i*e+n*t*r)},N.computeRealRoots=function(a,t,e,r){var n,i;if(0===a)return B.computeRealRoots(t,e,r);if(0!==t)return 0===e?0===r?(i=-t/a)<0?[i,0,0]:[0,0,i]:o(a,t,0,r):0===r?0===(n=B.computeRealRoots(a,t,e)).length?[0]:n[1]<=0?[n[0],n[1],0]:0<=n[0]?[0,n[0],n[1]]:[n[0],0,n[1]]:o(a,t,e,r);if(0!==e)return 0===r?0===(n=B.computeRealRoots(a,0,e)).Length?[0]:[n[0],0,n[1]]:o(a,0,e,r);if(0===r)return[0,0,0];var s=(i=-r/a)<0?-Math.pow(-i,1/3):Math.pow(i,1/3);return[s,s,s]};var V={};function c(a,t,e,r){var n=a*a,i=t-3*n/8,s=e-t*a/2+n*a/8,o=r-e*a/4+t*n/16-3*n*n/256,u=N.computeRealRoots(1,2*i,i*i-4*o,-s*s);if(0<u.length){var C=-a/4,c=u[u.length-1];if(Math.abs(c)<T.CesiumMath.EPSILON14){var l=B.computeRealRoots(1,i,o);if(2===l.length){var h,M=l[0],f=l[1];if(0<=M&&0<=f){var m=Math.sqrt(M),d=Math.sqrt(f);return[C-d,C-m,C+m,C+d]}if(0<=M&&f<0)return[C-(h=Math.sqrt(M)),C+h];if(M<0&&0<=f)return[C-(h=Math.sqrt(f)),C+h]}return[]}if(0<c){var g=Math.sqrt(c),v=(i+c-s/g)/2,p=(i+c+s/g)/2,w=B.computeRealRoots(1,g,v),R=B.computeRealRoots(1,-g,p);return 0!==w.length?(w[0]+=C,w[1]+=C,0!==R.length?(R[0]+=C,R[1]+=C,w[1]<=R[0]?[w[0],w[1],R[0],R[1]]:R[1]<=w[0]?[R[0],R[1],w[0],w[1]]:w[0]>=R[0]&&w[1]<=R[1]?[R[0],w[0],w[1],R[1]]:R[0]>=w[0]&&R[1]<=w[1]?[w[0],R[0],R[1],w[1]]:w[0]>R[0]&&w[0]<R[1]?[R[0],w[0],R[1],w[1]]:[w[0],R[0],w[1],R[1]]):w):0!==R.length?(R[0]+=C,R[1]+=C,R):[]}}return[]}function l(a,t,e,r){var n=a*a,i=-2*t,s=e*a+t*t-4*r,o=n*r-e*t*a+e*e,u=N.computeRealRoots(1,i,s,o);if(0<u.length){var C,c,l,h,M,f,m,d,g=u[0],v=t-g,p=v*v,w=a/2,R=v/2,S=p-4*r,O=p+4*Math.abs(r),x=n-4*g,y=n+4*Math.abs(g);l=g<0||S*y<x*O?(c=(C=Math.sqrt(x))/2,0===C?0:(a*R-e)/C):(c=0===(h=Math.sqrt(S))?0:(a*R-e)/h,h/2),0==w&&0===c?f=M=0:T.CesiumMath.sign(w)===T.CesiumMath.sign(c)?f=g/(M=w+c):M=g/(f=w-c),0==R&&0===l?d=m=0:T.CesiumMath.sign(R)===T.CesiumMath.sign(l)?d=r/(m=R+l):m=r/(d=R-l);var P=B.computeRealRoots(1,M,m),b=B.computeRealRoots(1,f,d);if(0!==P.length)return 0!==b.length?P[1]<=b[0]?[P[0],P[1],b[0],b[1]]:b[1]<=P[0]?[b[0],b[1],P[0],P[1]]:P[0]>=b[0]&&P[1]<=b[1]?[b[0],P[0],P[1],b[1]]:b[0]>=P[0]&&b[1]<=P[1]?[P[0],b[0],b[1],P[1]]:P[0]>b[0]&&P[0]<b[1]?[b[0],P[0],b[1],P[1]]:[P[0],b[0],P[1],b[1]]:P;if(0!==b.length)return b}return[]}function e(a,t){t=U.Cartesian3.clone(q.defaultValue(t,U.Cartesian3.ZERO)),U.Cartesian3.equals(t,U.Cartesian3.ZERO)||U.Cartesian3.normalize(t,t),this.origin=U.Cartesian3.clone(q.defaultValue(a,U.Cartesian3.ZERO)),this.direction=t}V.computeDiscriminant=function(a,t,e,r,n){var i=a*a,s=t*t,o=s*t,u=e*e,C=u*e,c=r*r,l=c*r,h=n*n;return s*u*c-4*o*l-4*a*C*c+18*a*t*e*l-27*i*c*c+256*(i*a)*(h*n)+n*(18*o*e*r-4*s*C+16*a*u*u-80*a*t*u*r-6*a*s*c+144*i*e*c)+h*(144*a*s*e-27*s*s-128*i*u-192*i*t*r)},V.computeRealRoots=function(a,t,e,r,n){if(Math.abs(a)<T.CesiumMath.EPSILON15)return N.computeRealRoots(t,e,r,n);var i=t/a,s=e/a,o=r/a,u=n/a,C=i<0?1:0;switch(C+=s<0?C+1:C,C+=o<0?C+1:C,C+=u<0?C+1:C){case 0:return c(i,s,o,u);case 1:case 2:return l(i,s,o,u);case 3:case 4:return c(i,s,o,u);case 5:return l(i,s,o,u);case 6:case 7:return c(i,s,o,u);case 8:return l(i,s,o,u);case 9:case 10:return c(i,s,o,u);case 11:return l(i,s,o,u);case 12:case 13:case 14:case 15:return c(i,s,o,u);default:return}},e.clone=function(a,t){if(q.defined(a))return q.defined(t)?(t.origin=U.Cartesian3.clone(a.origin),t.direction=U.Cartesian3.clone(a.direction),t):new e(a.origin,a.direction)},e.getPoint=function(a,t,e){return q.defined(e)||(e=new U.Cartesian3),e=U.Cartesian3.multiplyByScalar(a.direction,t,e),U.Cartesian3.add(a.origin,e,e)};var h={rayPlane:function(a,t,e){q.defined(e)||(e=new U.Cartesian3);var r=a.origin,n=a.direction,i=t.normal,s=U.Cartesian3.dot(i,n);if(!(Math.abs(s)<T.CesiumMath.EPSILON15)){var o=(-t.distance-U.Cartesian3.dot(i,r))/s;if(!(o<0))return e=U.Cartesian3.multiplyByScalar(n,o,e),U.Cartesian3.add(r,e,e)}}},g=new U.Cartesian3,v=new U.Cartesian3,p=new U.Cartesian3,w=new U.Cartesian3,R=new U.Cartesian3;h.rayTriangleParametric=function(a,t,e,r,n){n=q.defaultValue(n,!1);var i,s,o,u=a.origin,C=a.direction,c=U.Cartesian3.subtract(e,t,g),l=U.Cartesian3.subtract(r,t,v),h=U.Cartesian3.cross(C,l,p),M=U.Cartesian3.dot(c,h);if(n){if(M<T.CesiumMath.EPSILON6)return;if(d=U.Cartesian3.subtract(u,t,w),(f=U.Cartesian3.dot(d,h))<0||M<f)return;if(i=U.Cartesian3.cross(d,c,R),(s=U.Cartesian3.dot(C,i))<0||M<f+s)return;o=U.Cartesian3.dot(l,i)/M}else{if(Math.abs(M)<T.CesiumMath.EPSILON6)return;var f,m=1/M,d=U.Cartesian3.subtract(u,t,w);if((f=U.Cartesian3.dot(d,h)*m)<0||1<f)return;if(i=U.Cartesian3.cross(d,c,R),(s=U.Cartesian3.dot(C,i)*m)<0||1<f+s)return;o=U.Cartesian3.dot(l,i)*m}return o},h.rayTriangle=function(a,t,e,r,n,i){var s=h.rayTriangleParametric(a,t,e,r,n);if(q.defined(s)&&!(s<0))return q.defined(i)||(i=new U.Cartesian3),U.Cartesian3.multiplyByScalar(a.direction,s,i),U.Cartesian3.add(a.origin,i,i)};var M=new e;h.lineSegmentTriangle=function(a,t,e,r,n,i,s){var o=M;U.Cartesian3.clone(a,o.origin),U.Cartesian3.subtract(t,a,o.direction),U.Cartesian3.normalize(o.direction,o.direction);var u=h.rayTriangleParametric(o,e,r,n,i);if(!(!q.defined(u)||u<0||u>U.Cartesian3.distance(a,t)))return q.defined(s)||(s=new U.Cartesian3),U.Cartesian3.multiplyByScalar(o.direction,u,s),U.Cartesian3.add(o.origin,s,s)};var f={root0:0,root1:0};function u(a,t,e){q.defined(e)||(e=new W.Interval);var r=a.origin,n=a.direction,i=t.center,s=t.radius*t.radius,o=U.Cartesian3.subtract(r,i,p),u=function(a,t,e,r){var n=t*t-4*a*e;if(!(n<0)){if(0<n){var i=1/(2*a),s=Math.sqrt(n),o=(-t+s)*i,u=(-t-s)*i;return o<u?(r.root0=o,r.root1=u):(r.root0=u,r.root1=o),r}var C=-t/(2*a);if(0!=C)return r.root0=r.root1=C,r}}(U.Cartesian3.dot(n,n),2*U.Cartesian3.dot(n,o),U.Cartesian3.magnitudeSquared(o)-s,f);if(q.defined(u))return e.start=u.root0,e.stop=u.root1,e}h.raySphere=function(a,t,e){if(e=u(a,t,e),q.defined(e)&&!(e.stop<0))return e.start=Math.max(e.start,0),e};var m=new e;h.lineSegmentSphere=function(a,t,e,r){var n=m;U.Cartesian3.clone(a,n.origin);var i=U.Cartesian3.subtract(t,a,n.direction),s=U.Cartesian3.magnitude(i);if(U.Cartesian3.normalize(i,i),r=u(n,e,r),!(!q.defined(r)||r.stop<0||r.start>s))return r.start=Math.max(r.start,0),r.stop=Math.min(r.stop,s),r};var d=new U.Cartesian3,S=new U.Cartesian3;function Z(a,t,e){var r=a+t;return T.CesiumMath.sign(a)!==T.CesiumMath.sign(t)&&Math.abs(r/Math.max(Math.abs(a),Math.abs(t)))<e?0:r}h.rayEllipsoid=function(a,t){var e,r,n=t.oneOverRadii,i=U.Cartesian3.multiplyComponents(n,a.origin,d),s=U.Cartesian3.multiplyComponents(n,a.direction,S),o=U.Cartesian3.magnitudeSquared(i),u=U.Cartesian3.dot(i,s);if(1<o){if(0<=u)return;var C,c,l=u*u,h=o-1;if(l<(c=(C=U.Cartesian3.magnitudeSquared(s))*h))return;if(c<l){e=u*u-c;var M=(r=-u+Math.sqrt(e))/C,f=h/r;return M<f?new W.Interval(M,f):{start:f,stop:M}}var m=Math.sqrt(h/C);return new W.Interval(m,m)}return o<1?(h=o-1,e=u*u-(c=(C=U.Cartesian3.magnitudeSquared(s))*h),r=-u+Math.sqrt(e),new W.Interval(0,r/C)):u<0?(C=U.Cartesian3.magnitudeSquared(s),new W.Interval(0,-u/C)):void 0};var L=new U.Cartesian3,I=new U.Cartesian3,E=new U.Cartesian3,z=new U.Cartesian3,A=new U.Cartesian3,D=new W.Matrix3,k=new W.Matrix3,F=new W.Matrix3,G=new W.Matrix3,Y=new W.Matrix3,_=new W.Matrix3,j=new W.Matrix3,H=new U.Cartesian3,J=new U.Cartesian3,K=new U.Cartographic;h.grazingAltitudeLocation=function(a,t){var e=a.origin,r=a.direction;if(!U.Cartesian3.equals(e,U.Cartesian3.ZERO)){var n=t.geodeticSurfaceNormal(e,L);if(0<=U.Cartesian3.dot(r,n))return e}var i=q.defined(this.rayEllipsoid(a,t)),s=t.transformPositionToScaledSpace(r,L),o=U.Cartesian3.normalize(s,s),u=U.Cartesian3.mostOrthogonalAxis(s,z),C=U.Cartesian3.normalize(U.Cartesian3.cross(u,o,I),I),c=U.Cartesian3.normalize(U.Cartesian3.cross(o,C,E),E),l=D;l[0]=o.x,l[1]=o.y,l[2]=o.z,l[3]=C.x,l[4]=C.y,l[5]=C.z,l[6]=c.x,l[7]=c.y,l[8]=c.z;var h=W.Matrix3.transpose(l,k),M=W.Matrix3.fromScale(t.radii,F),f=W.Matrix3.fromScale(t.oneOverRadii,G),m=Y;m[0]=0,m[1]=-r.z,m[2]=r.y,m[3]=r.z,m[4]=0,m[5]=-r.x,m[6]=-r.y,m[7]=r.x,m[8]=0;var d,g=W.Matrix3.multiply(W.Matrix3.multiply(h,f,_),m,_),v=W.Matrix3.multiply(W.Matrix3.multiply(g,M,j),l,j),p=W.Matrix3.multiplyByVector(g,e,A),w=function(a,t,e,r,n){var i,s=r*r,o=n*n,u=(a[W.Matrix3.COLUMN1ROW1]-a[W.Matrix3.COLUMN2ROW2])*o,C=n*(r*Z(a[W.Matrix3.COLUMN1ROW0],a[W.Matrix3.COLUMN0ROW1],T.CesiumMath.EPSILON15)+t.y),c=a[W.Matrix3.COLUMN0ROW0]*s+a[W.Matrix3.COLUMN2ROW2]*o+r*t.x+e,l=o*Z(a[W.Matrix3.COLUMN2ROW1],a[W.Matrix3.COLUMN1ROW2],T.CesiumMath.EPSILON15),h=n*(r*Z(a[W.Matrix3.COLUMN2ROW0],a[W.Matrix3.COLUMN0ROW2])+t.z),M=[];if(0==h&&0==l){if(0===(i=B.computeRealRoots(u,C,c)).length)return M;var f,m,d=i[0],g=Math.sqrt(Math.max(1-d*d,0));return M.push(new U.Cartesian3(r,n*d,n*-g)),M.push(new U.Cartesian3(r,n*d,n*g)),2===i.length&&(f=i[1],m=Math.sqrt(Math.max(1-f*f,0)),M.push(new U.Cartesian3(r,n*f,n*-m)),M.push(new U.Cartesian3(r,n*f,n*m))),M}var v=h*h,p=l*l,w=h*l,R=u*u+p,S=2*(C*u+w),O=2*c*u+C*C-p+v,x=2*(c*C-w),y=c*c-v;if(0==R&&0==S&&0==O&&0==x)return M;var P=(i=V.computeRealRoots(R,S,O,x,y)).length;if(0===P)return M;for(var b=0;b<P;++b){var N=i[b],q=N*N,L=Math.max(1-q,0),I=Math.sqrt(L),E=T.CesiumMath.sign(u)===T.CesiumMath.sign(c)?Z(u*q+c,C*N,T.CesiumMath.EPSILON12):T.CesiumMath.sign(c)===T.CesiumMath.sign(C*N)?Z(u*q,C*N+c,T.CesiumMath.EPSILON12):Z(u*q+C*N,c,T.CesiumMath.EPSILON12),z=E*Z(l*N,h,T.CesiumMath.EPSILON15);z<0?M.push(new U.Cartesian3(r,n*N,n*I)):0<z?M.push(new U.Cartesian3(r,n*N,n*-I)):0!==I?(M.push(new U.Cartesian3(r,n*N,n*-I)),M.push(new U.Cartesian3(r,n*N,n*I)),++b):M.push(new U.Cartesian3(r,n*N,n*I))}return M}(v,U.Cartesian3.negate(p,L),0,0,1),R=w.length;if(0<R){for(var S=U.Cartesian3.clone(U.Cartesian3.ZERO,J),O=Number.NEGATIVE_INFINITY,x=0;x<R;++x){d=W.Matrix3.multiplyByVector(M,W.Matrix3.multiplyByVector(l,w[x],H),H);var y=U.Cartesian3.normalize(U.Cartesian3.subtract(d,e,z),z),P=U.Cartesian3.dot(y,r);O<P&&(O=P,S=U.Cartesian3.clone(d,S))}var b=t.cartesianToCartographic(S,K),O=T.CesiumMath.clamp(O,0,1),N=U.Cartesian3.magnitude(U.Cartesian3.subtract(S,e,z))*Math.sqrt(1-O*O);return N=i?-N:N,b.height=N,t.cartographicToCartesian(b,new U.Cartesian3)}};var O=new U.Cartesian3;h.lineSegmentPlane=function(a,t,e,r){q.defined(r)||(r=new U.Cartesian3);var n=U.Cartesian3.subtract(t,a,O),i=e.normal,s=U.Cartesian3.dot(i,n);if(!(Math.abs(s)<T.CesiumMath.EPSILON6)){var o=U.Cartesian3.dot(i,a),u=-(e.distance+o)/s;if(!(u<0||1<u))return U.Cartesian3.multiplyByScalar(n,u,r),U.Cartesian3.add(a,r,r),r}},h.trianglePlaneIntersection=function(a,t,e,r){var n,i,s=r.normal,o=r.distance,u=U.Cartesian3.dot(s,a)+o<0,C=U.Cartesian3.dot(s,t)+o<0,c=U.Cartesian3.dot(s,e)+o<0,l=0;if(l+=u?1:0,l+=C?1:0,1!=(l+=c?1:0)&&2!=l||(n=new U.Cartesian3,i=new U.Cartesian3),1==l){if(u)return h.lineSegmentPlane(a,t,r,n),h.lineSegmentPlane(a,e,r,i),{positions:[a,t,e,n,i],indices:[0,3,4,1,2,4,1,4,3]};if(C)return h.lineSegmentPlane(t,e,r,n),h.lineSegmentPlane(t,a,r,i),{positions:[a,t,e,n,i],indices:[1,3,4,2,0,4,2,4,3]};if(c)return h.lineSegmentPlane(e,a,r,n),h.lineSegmentPlane(e,t,r,i),{positions:[a,t,e,n,i],indices:[2,3,4,0,1,4,0,4,3]}}else if(2==l){if(!u)return h.lineSegmentPlane(t,a,r,n),h.lineSegmentPlane(e,a,r,i),{positions:[a,t,e,n,i],indices:[1,2,4,1,4,3,0,3,4]};if(!C)return h.lineSegmentPlane(e,t,r,n),h.lineSegmentPlane(a,t,r,i),{positions:[a,t,e,n,i],indices:[2,0,4,2,4,3,1,3,4]};if(!c)return h.lineSegmentPlane(a,e,r,n),h.lineSegmentPlane(t,e,r,i),{positions:[a,t,e,n,i],indices:[0,1,4,0,4,3,2,3,4]}}},a.IntersectionTests=h,a.Ray=e});
