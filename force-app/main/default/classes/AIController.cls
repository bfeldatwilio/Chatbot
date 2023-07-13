public with sharing class AIController {
    @AuraEnabled(cacheable=true)
    public static String getAIMessage(String payload) {

        functions.Function fn = functions.Function.get('BenFDev.langchainfunction');
        functions.FunctionInvocation invocation = fn.invoke(payload);

        if (invocation.getStatus() == functions.FunctionInvocationStatus.ERROR) {
            throw new CalloutException(
            (invocation.getError() != null
                ? invocation.getError().getMessage()
                : 'UNKNOWN')
            );
        }

        String response = invocation.getResponse();
    
        return response;
    }

    class AIMessage {
        String role;
        String content;
    }
}