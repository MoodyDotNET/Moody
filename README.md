# moodydotnet.github.io

Để xem các command thuờng dùng, vào [https://moodydotnet.github.io/]


File README này sẽ ghi những ghi chú gần nhất để mọi nguời cùng xem.

### 2018-05-20

Phát mới tạo các Model và gắn kết nối tới Database. Lần pull tiếp theo thực hiện các lệnh sau đây:
```
git pull
dotnet restore
dotnet build
# Chỉnh sửa connection string trong 2 file appsetting.json và appsetting.Development.json:
# "MoodyDatabase": "Server=localhost;Database=Moody;User ID=sa;Password=HongPhat0" <=== (chỉnh mật khẩu sa lại cho đúng)
dotnet run
```
Phát có viết sẵn 1 controller để kiểm tra connection. Để kiểm tra xem connection đã đúng chưa, vào 2 url này:
[http://localhost:5000/api/Testing/newAdmin] => nếu trả về true và trong table Administrator có thêm 1 user ‘nguyenhongphat0’ là đúng
[http://localhost:5000/api/Testing/allAdmin] => nếu nó trả về tất cả user trong bảng Administrator là ok

Công việc setup database đã xong, mình sẽ bắt tay vào viết API. để xem ví dụ api viết như thế nào thì mở file Controllers/TestingController.cs ra xem!