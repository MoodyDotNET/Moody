# moodydotnet.github.io

Để xem các command thuờng dùng, vào [https://moodydotnet.github.io/]


File README này sẽ ghi những ghi chú gần nhất để mọi nguời cùng xem.

### 2018-05-24

Phát mới tạo AdminFilter, bây giờ những Action nào cần Authen chỉ cần bỏ tên Filter phía trước, ví dụ:
```c#
[HttpGet("[action]")]
[AdminFilter]
public bool logout() {
    HttpContext.Session.Clear();
    return true;
}
```
Nếu user đã login thì sẽ thực hiện được Action trong đây, còn ko thì sẽ trả về false. Muốn chỉnh sửa code thì vào Filters/AdminFilter.cs

Phát mới tạo ISessionExtension, bây giờ có thể bỏ generic object vào trong session, ví dụ:
```c#
    HttpContext.Session.Set<Administrator>("ADMIN", admin);
    HttpContext.Session.Get<Administrator>("ADMIN");
```

Với lại phát vừa sửa tên và namespace của Model thành Models, cho nó hợp lí
Lần pull tiếp theo có thể sẽ có conflict :)), vì có 1 vài thứ phải đụng đến các file có sẵn, nhưng cứ pull thử nếu có lỗi p sẽ hỗ trợ