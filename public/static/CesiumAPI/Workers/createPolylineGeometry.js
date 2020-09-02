define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-bddc1162","./Transforms-f7baeaa6","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-77eae29c","./GeometryAttributes-4fcfcf40","./IndexDatatype-53503fee","./IntersectionTests-2f5badb6","./Plane-12526f0d","./VertexFormat-7572c785","./arrayRemoveDuplicates-ebc732b0","./ArcType-dc1c5aee","./EllipsoidRhumbLine-c704bf4c","./EllipsoidGeodesic-30fae80b","./PolylinePipeline-d636892a","./Color-4d18a532"],function(J,e,j,K,Q,t,r,X,Z,$,ee,a,o,y,te,re,n,i,ae,oe){"use strict";var ne=[];function m(e){var t=(e=J.defaultValue(e,J.defaultValue.EMPTY_OBJECT)).positions,r=e.colors,a=J.defaultValue(e.width,1),o=J.defaultValue(e.colorsPerVertex,!1);this._positions=t,this._colors=r,this._width=a,this._colorsPerVertex=o,this._vertexFormat=y.VertexFormat.clone(J.defaultValue(e.vertexFormat,y.VertexFormat.DEFAULT)),this._arcType=J.defaultValue(e.arcType,re.ArcType.GEODESIC),this._granularity=J.defaultValue(e.granularity,j.CesiumMath.RADIANS_PER_DEGREE),this._ellipsoid=K.Ellipsoid.clone(J.defaultValue(e.ellipsoid,K.Ellipsoid.WGS84)),this._workerName="createPolylineGeometry";var n=1+t.length*K.Cartesian3.packedLength;n+=J.defined(r)?1+r.length*oe.Color.packedLength:1,this.packedLength=n+K.Ellipsoid.packedLength+y.VertexFormat.packedLength+4}m.pack=function(e,t,r){var a;r=J.defaultValue(r,0);var o=e._positions,n=o.length;for(t[r++]=n,a=0;a<n;++a,r+=K.Cartesian3.packedLength)K.Cartesian3.pack(o[a],t,r);var i=e._colors,n=J.defined(i)?i.length:0;for(t[r++]=n,a=0;a<n;++a,r+=oe.Color.packedLength)oe.Color.pack(i[a],t,r);return K.Ellipsoid.pack(e._ellipsoid,t,r),r+=K.Ellipsoid.packedLength,y.VertexFormat.pack(e._vertexFormat,t,r),r+=y.VertexFormat.packedLength,t[r++]=e._width,t[r++]=e._colorsPerVertex?1:0,t[r++]=e._arcType,t[r]=e._granularity,t};var f=K.Ellipsoid.clone(K.Ellipsoid.UNIT_SPHERE),h=new y.VertexFormat,v={positions:void 0,colors:void 0,ellipsoid:f,vertexFormat:h,width:void 0,colorsPerVertex:void 0,arcType:void 0,granularity:void 0};m.unpack=function(e,t,r){t=J.defaultValue(t,0);for(var a=e[t++],o=new Array(a),n=0;n<a;++n,t+=K.Cartesian3.packedLength)o[n]=K.Cartesian3.unpack(e,t);var i=0<(a=e[t++])?new Array(a):void 0;for(n=0;n<a;++n,t+=oe.Color.packedLength)i[n]=oe.Color.unpack(e,t);var l=K.Ellipsoid.unpack(e,t,f);t+=K.Ellipsoid.packedLength;var s=y.VertexFormat.unpack(e,t,h);t+=y.VertexFormat.packedLength;var p=e[t++],c=1===e[t++],d=e[t++],u=e[t];return J.defined(r)?(r._positions=o,r._colors=i,r._ellipsoid=K.Ellipsoid.clone(l,r._ellipsoid),r._vertexFormat=y.VertexFormat.clone(s,r._vertexFormat),r._width=p,r._colorsPerVertex=c,r._arcType=d,r._granularity=u,r):(v.positions=o,v.colors=i,v.width=p,v.colorsPerVertex=c,v.arcType=d,v.granularity=u,new m(v))};var ie=new K.Cartesian3,le=new K.Cartesian3,se=new K.Cartesian3,pe=new K.Cartesian3;return m.createGeometry=function(e){var t=e._width,r=e._vertexFormat,a=e._colors,o=e._colorsPerVertex,n=e._arcType,i=e._granularity,l=e._ellipsoid,s=te.arrayRemoveDuplicates(e._positions,K.Cartesian3.equalsEpsilon),p=s.length;if(!(p<2||t<=0)){if(n===re.ArcType.GEODESIC||n===re.ArcType.RHUMB){var c,d=n===re.ArcType.GEODESIC?(c=j.CesiumMath.chordLength(i,l.maximumRadius),ae.PolylinePipeline.numberOfPoints):(c=i,ae.PolylinePipeline.numberOfPointsRhumbLine),u=ae.PolylinePipeline.extractHeights(s,l);if(J.defined(a)){for(var y=1,m=0;m<p-1;++m)y+=d(s[m],s[m+1],c);var f=new Array(y),h=0;for(m=0;m<p-1;++m){var v=s[m],C=s[m+1],g=a[m],_=d(v,C,c);if(o&&m<y)for(var A=function(e,t,r){var a=ne;a.length=r;var o=e.red,n=e.green,i=e.blue,l=e.alpha,s=t.red,p=t.green,c=t.blue,d=t.alpha;if(oe.Color.equals(e,t)){for(h=0;h<r;h++)a[h]=oe.Color.clone(e);return a}for(var u=(s-o)/r,y=(p-n)/r,m=(c-i)/r,f=(d-l)/r,h=0;h<r;h++)a[h]=new oe.Color(o+h*u,n+h*y,i+h*m,l+h*f);return a}(g,a[m+1],_),b=A.length,E=0;E<b;++E)f[h++]=A[E];else for(E=0;E<_;++E)f[h++]=oe.Color.clone(g)}f[h]=oe.Color.clone(a[a.length-1]),a=f,ne.length=0}s=n===re.ArcType.GEODESIC?ae.PolylinePipeline.generateCartesianArc({positions:s,minDistance:c,ellipsoid:l,height:u}):ae.PolylinePipeline.generateCartesianRhumbArc({positions:s,granularity:c,ellipsoid:l,height:u})}var P,w,T,x=4*(p=s.length)-4,k=new Float64Array(3*x),D=new Float64Array(3*x),V=new Float64Array(3*x),L=new Float32Array(2*x),F=r.st?new Float32Array(2*x):void 0,G=J.defined(a)?new Uint8Array(4*x):void 0,O=0,R=0,I=0,S=0;for(E=0;E<p;++E){0===E?(P=ie,K.Cartesian3.subtract(s[0],s[1],P),K.Cartesian3.add(s[0],P,P)):P=s[E-1],K.Cartesian3.clone(P,se),K.Cartesian3.clone(s[E],le),E===p-1?(P=ie,K.Cartesian3.subtract(s[p-1],s[p-2],P),K.Cartesian3.add(s[p-1],P,P)):P=s[E+1],K.Cartesian3.clone(P,pe),J.defined(G)&&(w=0===E||o?a[E]:a[E-1],E!==p-1&&(T=a[E]));for(var B=E===p-1?2:4,U=0===E?2:0;U<B;++U){K.Cartesian3.pack(le,k,O),K.Cartesian3.pack(se,D,O),K.Cartesian3.pack(pe,V,O),O+=3;var N,M=U-2<0?-1:1;L[R++]=U%2*2-1,L[R++]=M*t,r.st&&(F[I++]=E/(p-1),F[I++]=Math.max(L[R-2],0)),J.defined(G)&&(N=U<2?w:T,G[S++]=oe.Color.floatToByte(N.red),G[S++]=oe.Color.floatToByte(N.green),G[S++]=oe.Color.floatToByte(N.blue),G[S++]=oe.Color.floatToByte(N.alpha))}}var H=new $.GeometryAttributes;H.position=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:k}),H.prevPosition=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:D}),H.nextPosition=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:V}),H.expandAndWidth=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:L}),r.st&&(H.st=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:F})),J.defined(G)&&(H.color=new Z.GeometryAttribute({componentDatatype:X.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:4,values:G,normalize:!0}));var W=ee.IndexDatatype.createTypedArray(x,6*p-6),Y=0,q=0,z=p-1;for(E=0;E<z;++E)W[q++]=Y,W[q++]=Y+2,W[q++]=Y+1,W[q++]=Y+1,W[q++]=Y+2,W[q++]=Y+3,Y+=4;return new Z.Geometry({attributes:H,indices:W,primitiveType:Z.PrimitiveType.TRIANGLES,boundingSphere:Q.BoundingSphere.fromPoints(s),geometryType:Z.GeometryType.POLYLINES})}},function(e,t){return J.defined(t)&&(e=m.unpack(e,t)),e._ellipsoid=K.Ellipsoid.clone(e._ellipsoid),m.createGeometry(e)}});
