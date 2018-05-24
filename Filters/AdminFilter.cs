using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using moody.Models;
using moody.Extensions;
using Microsoft.AspNetCore.Mvc;

public class AdminFilter : ActionFilterAttribute, IActionFilter
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        // do something before the action executes
        Administrator admin = context.HttpContext.Session.Get<Administrator>("ADMIN");
        if (admin == null)
        {
            context.Result = new JsonResult(false);
        }
    }

    public override void OnActionExecuted(ActionExecutedContext context)
    {
        // do something after the action executes
    }
}