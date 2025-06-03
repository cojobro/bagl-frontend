// src/data/mockPapers.js

/*
    * A “mock” list of 5 papers. 
    * Each object must have at least: 
    *   id, title, authors (array), year, tags (array), pdf (path under /public/papers).
*/
const mockPapers = [
    {
        id: 1,
        title: "Analysis of Intersubject Variations in Intracochlear and Middle Ear Surface Anatomy for Cochlear Implantation",
        authors: ["Stanley Pelosi", "Jack H. Noble", "Benoit M. Dawant", "Robert F. Labadie"],
        year: 2013,
        tags: ["Cochlea", "Anatomy", "Diagnostic Imaging", "Individuality", "Radiography"],
        pdf: "/papers/paper1.pdf",
    },
    {
        id: 2,
        title: "Comparison of Cochlear Implant Relevant Anatomy in Children Versus Adults",
        authors: ["Theodore R. McRackan", "Fitsum A. Reda", "Alejandro Rivas", "Jack H. Noble", "Mary S. Dietrich", "Benoit M. Dawant", "Robert F. Labadie"],
        year: 2012,
        tags: ["Aging", "Cochlea", "Anatomy", "Individuality"],
        pdf: "/papers/paper2.pdf",
    },
    {
        id: 3,
        title: "Assessment of Electrode Placement and Audiological Outcomes in Bilateral Cochlear Implantation",
        authors: ["George B. Wanna", "Jack H. Noble", "Theodore R. McRackan", "Benoit M. Dawant", "Mary S. Dietrich", "Linsey D. Watkins", "Alejandro Rivas", "Theodore A. Schuman", "Robert F. Labadie"],
        year: 2011,
        tags: ["Cochlea", "Treatment Outcomes"],
        pdf: "/papers/paper3.pdf",
    },
    {
        id: 4,
        title: "Clinical Validation Study of Percutaneous Cochlear Access Using Patient-Customized Microstereotactic Frames",
        authors: ["Robert F. Labadie", "Ramya Balachandran", "Jason E. Mitchell", "Jack H. Noble", "Omid Majdani","David S. Haynes", "Marc L. Bennett", "Benoit M. Dawant","J. Michael Fitzpatrick"],
        year: 2009,
        tags: ["Equipment Design", "Coclea", "Individuality", "Surgical"],
        pdf: "/papers/paper4.pdf",
    },
    {
        id: 5,
        title: "Cochlear Implantation of Slim Precurved Arrays Using Automatic Preoperative Insertion Plans",
        authors: ["Kareem O. Tawfik", "Mohammad M.R. Khan", "Ankita Patro", "Miriam R. Smetak", "David Haynes", "Robert F. Labadie", "René H. Gifford", "Jack H. Noble"],
        year: 2025,
        tags: ["Cochlea", "Surgical", "Modeling"],
        pdf: "/papers/paper5.pdf",
    },
];

export default mockPapers;
