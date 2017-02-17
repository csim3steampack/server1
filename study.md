## Markdown start : ctrl + shift + m

## 오류 코드 정리

* 200 : 완벽히 성공
* 201 : 성공적 요청 & 서버가 새 리소스 작성
* 202 : 요청 접수 & 아직 처리하지 않음

</br>
* 400 : 잘못된 요청
* 401 : 권한 없음(로그인이 필요함)
* 402 : 결제 필요
* 403 : 서버가 요청을 거부하고 있다.
* 404 : 서버에 존재하지 않는 페이지에
* 409 : 서버가 요청을 수행하는 중에 충돌이 발생했다. 서버는 응답할 때 충돌에 대한 정보를 포함해야 한다. 서버는 PUT 요청과 충돌하는 PUT 요청에 대한 응답으로 이 코드를 요청 간 차이점 목록과 함께 표시해야 한다.

* 500 : 내부 서버 오류

## AWS S3
###### 참고자료[ http://www.slideshare.net/awskorea/aws-getting-started-and-amazon-s3 ]
* 객체(Object)
  S3에 데이터가 저장되는 기본단위
  구성 : 파일 / 메타데이터  

* 버킷(Bucket)
  S3에서 생성할 수 있는 최상위 디렉토리
  이름은 S3 region 중에서 유일해야 함
  계정별로 100개까지 생성 가능

* AWS IAM
  S3에 접근 가능한 사용자를 생성하고, 다른 곳에서도 접근 가능하게 하기 위해서 사용자의 Access Key와 Secret을 얻어오는 것
  </br>
  - 보안 팁
    1. 루트 Access Key를 만들지도 쓰지도 말자
    2. 오프라인 기기 혹은 앱 인증을 꼭 사용하자
    3. IAM 사용자를 생성하고, 필요한 권한만 주자
    4. IAM 그룹 생성을 통해 권한을 관리
    5. 암호 생성 조건을 꼭 설정

## 2/17 현진 강의
#### mysql 트랜젝션
* commit
* rollback
#### promise hello
* pending / resolve / reject
* 콜백 함수 중에
if(err) reject(err)를 하면 에러가 리턴되지 않고 다음 .then으로 이동해 버린다.
그러므로,
if(err) return reject(err)
에러처리에는 return을 꼭 해줘야함
* 콜백 함수를 사용하면 throw err를 자주 사용하는데, 이때에, 콘솔을 찍을 때, console.log('err', err.stack)을 사용하면, 어디에서 err가 나는지를 확인할 수 있다.







## Process란?

* process 객체는 프로그램을 실행했을 때 만들어지는 프로세스 정보를 다루는 객체이다.

setting|import|settingFileName
-|-|-
sanghun|junghun|melon
banana|apple|pineapple


```@mermaid
graph LR
a --> b
b --> c
style a fill: #f9f, stroke:#333, stroke-width:4px;


```
