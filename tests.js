const { MatrixTransform, MatrixTransformErrors, RotateMetricTypes, MatrixWrapMethods } = require('./MatrixTransform');

/* TEST */
var testMatrix = [
    [1, 2, 3, 4],
    [0, 1, 2, 3],
    [0, 0, 1, 2],
    [1, 0, 0, 1]
];

/* TEST */
var oddTestMatrix = [
    [1, 2, 3, 4, 5],
    [0, 3, 2, 3, 4],
    [0, 1, 2, 1, 3],
    [0, 0, 1, 3, 2],
    [1, 0, 0, 0, 1]
];

/* TEST */
var sixTestMatrix = [
    [1, 2, 3, 4, 5, 6],
    [3, 0, 0, 4, 1, 5],
    [0, 3, 2, 3, 1, 4],
    [0, 1, 2, 1, 0, 3],
    [0, 0, 1, 3, 1, 2],
    [1, 0, 0, 0, 2, 1]
];

/* TEST */
var eightTestMatrix = [
    [0, 1, 0, 7, 1, 2, 3, 1],
    [0, 1, 2, 3, 4, 5, 6, 1],
    [2, 3, 0, 0, 4, 1, 5, 4],
    [1, 0, 3, 2, 3, 1, 4, 5],
    [0, 0, 1, 2, 1, 0, 3, 4],
    [3, 0, 0, 1, 3, 1, 2, 7],
    [1, 1, 0, 0, 0, 2, 1, 0],
    [1, 2, 1, 3, 3, 1, 0, 0]
];

(function () {
    console.log('_____________ getEdgeBorderLengthFromMatrix ____________')
    console.log('getEdgeBorderLengthFromMatrix 1:', MatrixTransform.getEdgeBorderLengthFromMatrix([]) === 0);
    console.log('getEdgeBorderLengthFromMatrix 2:', MatrixTransform.getEdgeBorderLengthFromMatrix(testMatrix) === 12);
    console.log('getEdgeBorderLengthFromMatrix 3:', MatrixTransform.getEdgeBorderLengthFromMatrix(oddTestMatrix) === 16);
    console.log('getEdgeBorderLengthFromMatrix 4:', MatrixTransform.getEdgeBorderLengthFromMatrix(sixTestMatrix) === 20);
    console.log('getEdgeBorderLengthFromMatrix 5:', MatrixTransform.getEdgeBorderLengthFromMatrix(eightTestMatrix) === 28);
})();

(function () {
    console.log('_____________ getNestingSizeFromBorderLength ____________')
    console.log('getNestingSizeFromBorderLength 1:', MatrixTransform.getNestingSizeFromBorderLength([]) === 0);
    console.log('getNestingSizeFromBorderLength 2:', MatrixTransform.getNestingSizeFromBorderLength([1]) === 1);
    console.log('getNestingSizeFromBorderLength 3:', MatrixTransform.getNestingSizeFromBorderLength([1, 2, 3, 4]) === 1);
    try {
        console.log('getNestingSizeFromBorderLength: ', MatrixTransform.getNestingSizeFromBorderLength());
    } catch (e) {
        console.log('exception: ', e.message == MatrixTransformErrors.UNDEFINED_EDGE_BORDER, e.message);
    }
    console.log('getNestingSizeFromBorderLength 1:', MatrixTransform.getNestingSizeFromBorderLength([1, 2, 3]) === 1);
    console.log('getNestingSizeFromBorderLength 2:', MatrixTransform.getNestingSizeFromBorderLength([0, 1, 0, 7, 1, 2, 3, 1, 1, 4, 5, 4]) === 2);
    console.log('getNestingSizeFromBorderLength 3:', MatrixTransform.getNestingSizeFromBorderLength([0, 1, 0, 7, 1, 2, 3, 1, 1, 4, 5, 4, 0, 7, 1, 2, 3, 1, 1, 4, 5, 4]) === 3);
    console.log('getNestingSizeFromBorderLength 4:', MatrixTransform.getNestingSizeFromBorderLength([0, 1, 0, 7, 1, 2, 3, 1, 1, 4, 5, 4, 0, 7, 1, 2, 3, 1, 1, 4, 5, 4, 0, 1, 0, 7, 1, 2]) === 4);
})();

(function () {
    console.log('_____________ isValidEdgeBorder ____________')
    console.log('isValidEdgeBorder:', MatrixTransform.isValidEdgeBorder(testMatrix, [1, 2, 3]) === false);
    console.log('odd matrix from empty 1:', MatrixTransform.isValidEdgeBorder([], [1, 2, 3]) === true); // warning
    console.log('odd matrix from empty 2: ', MatrixTransform.isValidEdgeBorder([], [1]) === true);
    const extrudedBorder = [0, 1, 0, 7, 1, 2, 3, 1, 1, 4, 5, 4];
    try {
        console.log('isValidEdgeBorder [exception]:', MatrixTransform.isValidEdgeBorder(testMatrix, extrudedBorder) === false);
    } catch (e) {
        console.log('exception: ', e.message === MatrixTransformErrors)
    }
    const wrongExtrudedBorder = [0, 1, 0, 7, 1, 2, 3, 1, 1, 4, 5];
    console.log('isValidEdgeBorder [wrong]: ', MatrixTransform.isValidEdgeBorder(testMatrix, wrongExtrudedBorder) === false);
})();

(function () {
    console.log('_____________ appendEdgeBorder ____________')
    const extrudedBorder = [0, 1, 2, 3, 4, 5, 7, 1, 5, 3, 0, 8, 7, 6, 5, 3, 0, 5, 0, 3];
    const matrix1 = [[1, 2, 3, 4], [0, 1, 2, 3], [0, 0, 1, 2], [1, 0, 0, 1]];
    const newMatrix1 = MatrixTransform.clone(matrix1);
    const newMatrix2 = MatrixTransform.clone(matrix1);
    const matrix2 = [[0, 1, 2, 3, 4, 5], [3, 1, 2, 3, 4, 7], [0, 0, 1, 2, 3, 1], [5, 0, 0, 1, 2, 5], [0, 1, 0, 0, 1, 3], [3, 5, 6, 7, 8, 0]];
    const extrudedMatrix = MatrixTransform.appendEdgeBorder(newMatrix1, extrudedBorder);
    console.log('new matrix: ', extrudedMatrix);
    console.log('appendEdgeBorder: ', JSON.stringify(extrudedMatrix) === JSON.stringify(matrix2));
    console.log('appendEdgeBorder from empty matrix 1: ', JSON.stringify(MatrixTransform.appendEdgeBorder([], [2])) === JSON.stringify([[2]]));
    console.log('appendEdgeBorder from empty matrix 2: ', JSON.stringify(MatrixTransform.appendEdgeBorder([], [2, 4, 6, 7])) === JSON.stringify([[2, 4], [7, 6]]));
    try {
        MatrixTransform.appendEdgeBorder(newMatrix2, [1, 2, 3, 4, 5, 7, 1, 5, 3, 0, 8, 7, 6, 5, 3, 0, 5, 0]);
    } catch (e) {
        console.log('exception: ', e.message === MatrixTransformErrors.INVALID_EDGE_BORDER_SIZE, e.message);
    }

    const oddMatrix = [[2]];
    const oddMatrix1 = MatrixTransform.clone(oddMatrix);
    console.log('oddM:', MatrixTransform.appendEdgeBorder(oddMatrix, [1, 2, 3, 4, 6, 5, 0, 0]))
    console.log('odd matrix:', JSON.stringify(MatrixTransform.appendEdgeBorder(oddMatrix1, [1, 2, 3, 4, 6, 5, 0, 0])) === JSON.stringify([[1, 2, 3], [0, 2, 4], [0, 5, 6]]));
})();

(function () {
    console.log('___________________ wrap __________________')
    // [
    //     [1,2,3,4],
    //     [0,1,2,3],
    //     [0,0,1,2],
    //     [1,0,0,1]
    // ]
    const unwrapedMatrix = [[1, 2, 3, 4, 3, 2, 1, 0, 0, 1, 0, 0], [1, 2, 1, 0]];
    const wrappedTestedMatrix = MatrixTransform.wrap(unwrapedMatrix)
    console.log('wrap: ', JSON.stringify(testMatrix) === JSON.stringify(wrappedTestedMatrix));

    // [1, 2, 3, 4, 5]
    // [0, 3, 2, 3, 4]
    // [0, 0, 2, 1, 3]
    // [0, 0 ,1 ,3 ,2]
    // [1, 0, 0, 0, 1]
    const unwrapedOddMatrix = [[1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 0, 0, 1, 0, 0, 0], [3, 2, 3, 1, 3, 1, 0, 1], [2]];
    const wrappedOddTestedMatrix = MatrixTransform.wrap(unwrapedOddMatrix);
    console.log(wrappedOddTestedMatrix)
    console.log('wrap [odd]: ', JSON.stringify(oddTestMatrix) === JSON.stringify(wrappedOddTestedMatrix));
})();

(function () {
    console.log('___________________ four __________________')
    const matrixTransform = new MatrixTransform(testMatrix);
    const unwrapTestedMatrix = MatrixTransform.unwrap(testMatrix);
    console.log('edges:', unwrapTestedMatrix)
    console.log('length:', unwrapTestedMatrix.length === 2)
    for (let i = 0, l = unwrapTestedMatrix.length; i < l; i++) {
        const edge = unwrapTestedMatrix[i].join('');
        if (i === 0) {
            console.log('1 circle', edge === '123432100100')
        } else if (i === 1) {
            console.log('2 circle', edge === '1210')
        }
    }
    const wrapTestedBorderEdge = MatrixTransform.wrap(unwrapTestedMatrix);
    console.log('wrap:', JSON.stringify(wrapTestedBorderEdge) === JSON.stringify(testMatrix));
})();

(function () {
    console.log('___________________ odd __________________')
    const oddMatrixTransform = new MatrixTransform(oddTestMatrix);
    const unwrapOddTestedMatrix = MatrixTransform.unwrap(oddTestMatrix);
    console.log('edges:', unwrapOddTestedMatrix)
    console.log('length:', unwrapOddTestedMatrix.length === 3)
    for (let i = 0, l = unwrapOddTestedMatrix.length; i < l; i++) {
        const edge = unwrapOddTestedMatrix[i].join('');
        if (i === 0) {
            console.log('1 circle', edge === '1234543210001000')
        } else if (i === 1) {
            console.log('2 circle', edge === '32313101')
        } else if (i === 2) {
            console.log('3 circle', edge === '2')
        }
    }
    const wrapOddTestedBorderEdge = MatrixTransform.wrap(unwrapOddTestedMatrix);
    console.log('wrap:', JSON.stringify(wrapOddTestedBorderEdge) === JSON.stringify(oddTestMatrix));
})();

(function () {
    console.log('____________________ six _________________')
    const sixMatrixTransform = new MatrixTransform(sixTestMatrix);
    const unwrapSixTestedMatrix = MatrixTransform.unwrap(sixTestMatrix);
    console.log('edges:', unwrapSixTestedMatrix)
    console.log('length:', unwrapSixTestedMatrix.length === 3)
    for (let i = 0, l = unwrapSixTestedMatrix.length; i < l; i++) {
        const edge = unwrapSixTestedMatrix[i].join('');
        if (i === 0) {
            console.log('1 circle', edge === '12345654321200010003')
        } else if (i === 1) {
            console.log('2 circle', edge === '004110131013')
        } else if (i === 2) {
            console.log('3 circle', edge === '2312')
        }
    }
    const wrapSixTestedBorderEdge = MatrixTransform.wrap(unwrapSixTestedMatrix);
    console.log('wrap:', JSON.stringify(wrapSixTestedBorderEdge) === JSON.stringify(sixTestMatrix));
})();

(function () {
    console.log('____________________ rotate _________________')
    const matrix = new MatrixTransform(MatrixTransform.clone(testMatrix));
    const rotatedTo90Matrix = matrix.rotate(.25);
    console.log('rotate to 90 deg:', JSON.stringify(rotatedTo90Matrix) === JSON.stringify([[1, 0, 0, 1], [0, 0, 1, 2], [0, 1, 2, 3], [1, 2, 3, 4]]));

    const matrix1 = new MatrixTransform(MatrixTransform.clone(testMatrix));
    const rotatedTo45Matrix = matrix1.rotate(45, RotateMetricTypes.DEGREES);
    console.log('rotate to 45 deg:', JSON.stringify(rotatedTo45Matrix) === JSON.stringify([[0, 0, 1, 2], [1, 0, 1, 3], [0, 1, 2, 4], [0, 1, 2, 3]]));

    // visual tests

    // testMatrix (before)
    // rotatedTo90Matrix (after)
    // В другой раз)
})();

// (function () {
//     console.log('____________________ MatrixWrapMethods.CIRCLE 90 _________________')
//     const matrixRect = [
//         [1, 2, 3, 4, 5, 6],
//         [0, 1, 2, 3, 4, 5],
//         [0, 0, 1, 2, 3, 4],
//         [1, 0, 0, 1, 2, 3]
//     ];
//     const expectedMatrix = [
//         [1, 0, 0, 1],
//         [0, 0, 1, 2],
//         [0, 1, 2, 3],
//         [1, 2, 3, 4],
//         [2, 3, 4, 5],
//         [3, 4, 5, 6]
//     ];
//     const matrix = new MatrixTransform(MatrixTransform.clone(matrixRect));
//     const rotatedTo90Matrix = matrix.rotate(90, RotateMetricTypes.DEGREES, { method: MatrixWrapMethods.CIRCLE });
//     console.log('rotate to 90 deg:', JSON.stringify(rotatedTo90Matrix) === JSON.stringify(expectedMatrix));
// })();

// (function () {
//     console.log('____________________ MatrixWrapMethods.CIRCLE 45 _________________')
//     const matrixRect = [
//         [1, 2, 3, 4, 5, 6],
//         [0, 1, 2, 3, 4, 5],
//         [0, 0, 1, 2, 3, 4],
//         [1, 0, 0, 1, 2, 3]
//     ];
//     const expectedMatrix = [
//         [1, 0, 0, 1],
//         [0, 0, 1, 2],
//         [0, 1, 2, 3],
//         [1, 2, 3, 4],
//         [2, 3, 4, 5],
//         [3, 4, 5, 6]
//     ];

//     // [A, A, A, 1, 2, A, A]
//     // [A, 0, 0, 1, 3, 4, A]
//     // [1, 0, 1, 2, 2, 3, 5]
//     // [A, A, A, 1, 3, 4, 6]
//     // [A, A, A, 1, 4, 5, A]
//     // [A, A, 1, 2, 3, A, A]
//     const matrix = new MatrixTransform(MatrixTransform.clone(matrixRect));
//     const rotatedTo90Matrix = matrix.rotate(90, RotateMetricTypes.DEGREES, { method: MatrixWrapMethods.CIRCLE });
//     console.log('rotate to 90 deg:', JSON.stringify(rotatedTo90Matrix) === JSON.stringify(expectedMatrix));
// })();
