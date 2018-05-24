using Microsoft.AspNetCore.Mvc.Filters;

public class AdminFilter : ActionFilterAttribute, IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // do something before the action executes
        // if (context.HttpContext.Session)
        // {
            
        // }
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        // do something after the action executes
    }
}