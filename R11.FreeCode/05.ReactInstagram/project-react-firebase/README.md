https://www.youtube.com/watch?v=RMScMwY2B6Q&t=12878s&ab_channel=freeCodeCamp.org

4:18:41
7:13:13

<!-- Rules Cloud Firestore -->

<!--
8:12:38 min

rules_version = '2';

service cloud.firestore {

match /databases/{database}/documents {

  match /users/{userId} {
  allow read;
  allow write: if request.auth != null && request.auth.uid == userId;
 }

match /posts/{postId} {
allow read;
allow create: if request.auth != null;
allow update: if request.auth != null;
allow delete: if request.auth != null && request.auth.uid == resource.data.createdBy;

}


}



 -->
