define(["./when-54c2dc71","./Check-6c0211bc","./Math-fc8cecf5","./Cartesian2-bddc1162","./Transforms-f7baeaa6","./RuntimeError-2109023a","./WebGLConstants-76bb35d1","./ComponentDatatype-6d99a1ee","./GeometryAttribute-77eae29c","./GeometryAttributes-4fcfcf40","./IndexDatatype-53503fee","./GeometryOffsetAttribute-7350d9af","./EllipseGeometryLibrary-903e671e","./EllipseOutlineGeometry-9cc8f68d"],function(r,e,t,n,i,c,a,o,l,s,f,d,u,m){"use strict";return function(e,t){return r.defined(t)&&(e=m.EllipseOutlineGeometry.unpack(e,t)),e._center=n.Cartesian3.clone(e._center),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),m.EllipseOutlineGeometry.createGeometry(e)}});
