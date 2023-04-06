"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iam = require("aws-cdk-lib/aws-iam");
const cdk = require("aws-cdk-lib");
const cx_api_1 = require("aws-cdk-lib/cx-api");
const lambda = require("aws-cdk-lib/aws-lambda");
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-lambda-1');
const fn = new lambda.Function(stack, 'MyLambda', {
    code: new lambda.InlineCode('foo'),
    handler: 'index.handler',
    runtime: lambda.Runtime.NODEJS_14_X,
});
fn.addToRolePolicy(new iam.PolicyStatement({
    resources: ['*'],
    actions: ['*'],
}));
fn.addFunctionUrl();
const version = fn.currentVersion;
const alias = new lambda.Alias(stack, 'Alias', {
    aliasName: 'prod',
    version,
});
alias.addPermission('AliasPermission', {
    principal: new iam.ServicePrincipal('cloudformation.amazonaws.com'),
});
alias.addFunctionUrl({
    authType: lambda.FunctionUrlAuthType.NONE,
});
// Changes the function description when the feature flag is present
// to validate the changed function hash.
cdk.Aspects.of(stack).add(new lambda.FunctionVersionUpgrade(cx_api_1.LAMBDA_RECOGNIZE_LAYER_VERSION));
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWcubGFtYmRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW50ZWcubGFtYmRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkNBQTJDO0FBQzNDLG1DQUFtQztBQUNuQywrQ0FBb0U7QUFDcEUsaURBQWlEO0FBRWpELE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBRTFCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztBQUVyRCxNQUFNLEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRTtJQUNoRCxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztJQUNsQyxPQUFPLEVBQUUsZUFBZTtJQUN4QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO0NBQ3BDLENBQUMsQ0FBQztBQUVILEVBQUUsQ0FBQyxlQUFlLENBQUMsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDO0lBQ3pDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztJQUNoQixPQUFPLEVBQUUsQ0FBQyxHQUFHLENBQUM7Q0FDZixDQUFDLENBQUMsQ0FBQztBQUNKLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUVwQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUMsY0FBYyxDQUFDO0FBRWxDLE1BQU0sS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO0lBQzdDLFNBQVMsRUFBRSxNQUFNO0lBQ2pCLE9BQU87Q0FDUixDQUFDLENBQUM7QUFDSCxLQUFLLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFO0lBQ3JDLFNBQVMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsQ0FBQztDQUNwRSxDQUFDLENBQUM7QUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDO0lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSTtDQUMxQyxDQUFDLENBQUM7QUFFSCxvRUFBb0U7QUFDcEUseUNBQXlDO0FBQ3pDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyx1Q0FBOEIsQ0FBQyxDQUFDLENBQUM7QUFFN0YsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgaWFtIGZyb20gJ2F3cy1jZGstbGliL2F3cy1pYW0nO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IExBTUJEQV9SRUNPR05JWkVfTEFZRVJfVkVSU0lPTiB9IGZyb20gJ2F3cy1jZGstbGliL2N4LWFwaSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnYXdzLWNkay1saWIvYXdzLWxhbWJkYSc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5cbmNvbnN0IHN0YWNrID0gbmV3IGNkay5TdGFjayhhcHAsICdhd3MtY2RrLWxhbWJkYS0xJyk7XG5cbmNvbnN0IGZuID0gbmV3IGxhbWJkYS5GdW5jdGlvbihzdGFjaywgJ015TGFtYmRhJywge1xuICBjb2RlOiBuZXcgbGFtYmRhLklubGluZUNvZGUoJ2ZvbycpLFxuICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNF9YLFxufSk7XG5cbmZuLmFkZFRvUm9sZVBvbGljeShuZXcgaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gIHJlc291cmNlczogWycqJ10sXG4gIGFjdGlvbnM6IFsnKiddLFxufSkpO1xuZm4uYWRkRnVuY3Rpb25VcmwoKTtcblxuY29uc3QgdmVyc2lvbiA9IGZuLmN1cnJlbnRWZXJzaW9uO1xuXG5jb25zdCBhbGlhcyA9IG5ldyBsYW1iZGEuQWxpYXMoc3RhY2ssICdBbGlhcycsIHtcbiAgYWxpYXNOYW1lOiAncHJvZCcsXG4gIHZlcnNpb24sXG59KTtcbmFsaWFzLmFkZFBlcm1pc3Npb24oJ0FsaWFzUGVybWlzc2lvbicsIHtcbiAgcHJpbmNpcGFsOiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoJ2Nsb3VkZm9ybWF0aW9uLmFtYXpvbmF3cy5jb20nKSxcbn0pO1xuYWxpYXMuYWRkRnVuY3Rpb25Vcmwoe1xuICBhdXRoVHlwZTogbGFtYmRhLkZ1bmN0aW9uVXJsQXV0aFR5cGUuTk9ORSxcbn0pO1xuXG4vLyBDaGFuZ2VzIHRoZSBmdW5jdGlvbiBkZXNjcmlwdGlvbiB3aGVuIHRoZSBmZWF0dXJlIGZsYWcgaXMgcHJlc2VudFxuLy8gdG8gdmFsaWRhdGUgdGhlIGNoYW5nZWQgZnVuY3Rpb24gaGFzaC5cbmNkay5Bc3BlY3RzLm9mKHN0YWNrKS5hZGQobmV3IGxhbWJkYS5GdW5jdGlvblZlcnNpb25VcGdyYWRlKExBTUJEQV9SRUNPR05JWkVfTEFZRVJfVkVSU0lPTikpO1xuXG5hcHAuc3ludGgoKTtcbiJdfQ==